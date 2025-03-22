import { z } from "zod";
import { CompressImageSchema, CropImageSchema, ResizeImageSchema } from "../types/edit.js";
import * as fs from "fs";
import * as path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_DIR = path.join(__dirname, "output");

const saveFsWrite = (dir: string) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const getFilename = (input: string) => {
  try {
    return input.startsWith("http")
      ? path.basename(new URL(input).pathname)
      : path.basename(input);
  } catch {
    return "unknown_file";
  }
};

const getImageBuffer = async (
  input: string
): Promise<{ buffer: Buffer; format: string }> => {
  let buffer: Buffer;
  if (input.startsWith("http")) {
    const response = await fetch(input);
    if (!response.ok) {
      throw new Error(`Failed to fetch image from URL: ${input}`);
    }
    buffer = Buffer.from(await response.arrayBuffer());
  } else {
    buffer = fs.readFileSync(input);
  }
  const metadata = await sharp(buffer).metadata();
  return { buffer, format: metadata.format || "unknown" };
};

export const handleEditCompressImage = async (
  args: z.infer<typeof CompressImageSchema>
) => {
  const outputDir = args.outputPath || OUTPUT_DIR;

  saveFsWrite(outputDir);

  const results = await Promise.allSettled(
    args.inputs.map(async (input) => {
      try {
        const { buffer, format } = await getImageBuffer(input);
        const image = sharp(buffer, {
          animated: format === "gif",
          limitInputPixels: false,
        });
        const outputPath = path.join(
          outputDir,
          `${Date.now()}-${getFilename(input)}`
        );

        let output = image;
        if (
          format === "jpeg" ||
          format === "jpg" ||
          format === "png" ||
          format === "webp"
        ) {
          output = output.png({ quality: args.quality });
        } else if (format === "gif") {
          output = output.gif({ colors: args.quality });
        }
        await output.toFile(outputPath);
        return {
          success: true,
          message: `Compressed image saved to ${outputPath}`,
        };
      } catch (error) {
        throw new Error(
          `Failed to compress image ${input}: ${
            (error as Error)?.message
          } || "Unknown error"}`
        );
      }
    })
  );
  const successes: { success: boolean; message: string }[] = [];
  const failures: string[] = [];

  results.forEach((result) => {
    if (result.status === "fulfilled") {
      successes.push(result.value);
    } else {
      failures.push(
        result.reason instanceof Error
          ? result.reason.message
          : String(result.reason)
      );
    }
  });

  if (successes.length === 0) {
    return {
      content: [
        {
          type: "text",
          text: `❌ All images failed to compress.\nReasons:\n${failures.join(
            "\n"
          )}`,
        },
      ],
      isError: true,
    };
  }

  return {
    content: [
      {
        type: "text",
        text: `✅ ${successes.length} images compressed, ${
          failures.length
        } images failed to compress.\n
        Successes:\n${successes.map((s) => s.message).join("\n")}\n
        Failures:\n${failures.join("\n")}`,
      },
    ],
    isError: false,
  };
};

export const handleEditCropImage = async (
  args: z.infer<typeof CropImageSchema>
) => {
  const outputDir = args.outputPath || OUTPUT_DIR;

  saveFsWrite(outputDir);

  const results = await Promise.allSettled(
    args.inputs.map(async (input) => {
      try {
        const { buffer, format } = await getImageBuffer(input);
        const image = sharp(buffer, {
          animated: format === "gif",
          limitInputPixels: false,
        });
        const outputPath = path.join(
          outputDir,
          `${Date.now()}-${getFilename(input)}`
        );
        await image
          .extract({
            width: args.width || 512,
            height: args.height || 512,
            left: args.left || 0,
            top: args.top || 0,
          })
          .toFile(outputPath);
        return `Cropped image saved to ${outputPath}`;
      } catch (error) {
        throw new Error(
          `Failed to crop image ${input}: ${
            (error as Error)?.message
          } || "Unknown error"}`
        );
      }
    })
  );
  const successes: { success: boolean; message: string }[] = [];
  const failures: string[] = [];

  results.forEach((result) => {
    if (result.status === "fulfilled") {
      successes.push({ success: true, message: result.value });
    } else {
      failures.push(
        result.reason instanceof Error
          ? result.reason.message
          : String(result.reason)
      );
    }
  });

  if (successes.length === 0) {
    return {
      content: [
        {
          type: "text",
          text: `❌ All images failed to crop.\nReasons:\n${failures.join(
            "\n"
          )}`,
        },
      ],
      isError: true,
    };
  }

  return {
    content: [
      {
        type: "text",
        text: `✅ ${successes.length} images cropped, ${
          failures.length
        } images failed to crop.\n
        Successes:\n${successes.map((s) => s.message).join("\n")}\n
        Failures:\n${failures.join("\n")}`,
      },
    ],
    isError: false,
  };
};

export const handleEditResizeImage = async (
  args: z.infer<typeof ResizeImageSchema>
) => {
  const outputDir = args.outputPath || OUTPUT_DIR;

  saveFsWrite(outputDir);

  const results = await Promise.allSettled(
    args.inputs.map(async (input) => {
      try {
        const { buffer, format } = await getImageBuffer(input);
        const image = sharp(buffer, {
          animated: format === "gif",
          limitInputPixels: false,
        });
        
        const outputPath = path.join(
          outputDir,
          `${Date.now()}-${getFilename(input)}`
        );
        
        // Get original image metadata
        const metadata = await image.metadata();
        const originalWidth = metadata.width || 0;
        const originalHeight = metadata.height || 0;
        
        // Calculate new dimensions for proportional resizing
        let resizeOptions: sharp.ResizeOptions = {
          fit: args.fit,
        };
        
        if (args.width && args.height) {
          // Both width and height provided - use as is
          resizeOptions.width = args.width;
          resizeOptions.height = args.height;
        } else if (args.width) {
          // Only width provided - calculate height proportionally
          const aspectRatio = originalHeight / originalWidth;
          resizeOptions.width = args.width;
          resizeOptions.height = Math.round(args.width * aspectRatio);
        } else if (args.height) {
          // Only height provided - calculate width proportionally
          const aspectRatio = originalWidth / originalHeight;
          resizeOptions.height = args.height;
          resizeOptions.width = Math.round(args.height * aspectRatio);
        }
        
        await image.resize(resizeOptions).toFile(outputPath);
        
        return {
          success: true,
          message: `Resized image saved to ${outputPath} (dimensions: ${resizeOptions.width}x${resizeOptions.height})`,
        };
      } catch (error) {
        throw new Error(
          `Failed to resize image ${input}: ${
            (error as Error)?.message
          } || "Unknown error"}`
        );
      }
    })
  );
  
  const successes: { success: boolean; message: string }[] = [];
  const failures: string[] = [];

  results.forEach((result) => {
    if (result.status === "fulfilled") {
      successes.push(result.value);
    } else {
      failures.push(
        result.reason instanceof Error
          ? result.reason.message
          : String(result.reason)
      );
    }
  });

  if (successes.length === 0) {
    return {
      content: [
        {
          type: "text",
          text: `❌ All images failed to resize.\nReasons:\n${failures.join(
            "\n"
          )}`,
        },
      ],
      isError: true,
    };
  }

  return {
    content: [
      {
        type: "text",
        text: `✅ ${successes.length} images resized, ${
          failures.length
        } images failed to resize.\n
        Successes:\n${successes.map((s) => s.message).join("\n")}\n
        Failures:\n${failures.join("\n")}`,
      },
    ],
    isError: false,
  };
};
