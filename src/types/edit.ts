import { z } from "zod";

export const CompressImageSchema = z.object({
  inputs: z
    .array(z.string())
    .describe("The URLs or full paths to the images to compress."),
  quality: z
    .number()
    .optional()
    .describe("The quality of the compressed image.")
    .default(80),
  outputPath: z
    .string()
    .optional()
    .describe("The full path to save the compressed image."),
});

export const CropImageSchema = z.object({
  inputs: z
    .array(z.string())
    .describe("The URLs or full paths to the images to crop."),
  width: z
    .number()
    .describe("The width of the cropped image.")
    .optional()
    .default(512),
  height: z
    .number()
    .describe("The height of the cropped image.")
    .optional()
    .default(512),
  left: z
    .number()
    .describe("The top position of the cropped image.")
    .optional()
    .default(0),
  top: z
    .number()
    .describe("The left position of the cropped image.")
    .optional()
    .default(0),
  outputPath: z
    .string()
    .optional()
    .describe("The full path to save the cropped image."),
});

export const ResizeImageSchema = z.object({
  inputs: z
    .array(z.string())
    .describe("The URLs or full paths to the images to resize."),
  width: z
    .number()
    .optional()
    .describe("The target width of the resized image in pixels."),
  height: z
    .number()
    .optional()
    .describe("The target height of the resized image in pixels."),
  outputPath: z
    .string()
    .optional()
    .describe("The full path to save the resized image."),
  fit: z
    .enum(["cover", "contain", "fill", "inside", "outside"])
    .optional()
    .default("contain")
    .describe("How the image should be resized to fit the target dimensions."),
})
.refine(
  (data) => data.width !== undefined || data.height !== undefined,
  {
    message: "At least one of width or height must be provided",
    path: ["width", "height"],
  }
);
