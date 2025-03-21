import { z } from "zod";

export const AigcConfigSchema = z.object({
  seed: z
    .string()
    .optional()
    .describe(
      "Controls randomness of image generation. Same seed = same image. Use -1 for random. Range: 0-4294967295 or -1."
    ),
  image_url: z
    .string()
    .optional()
    .describe(
      "Upload reference image for ControlNet (e.g., sketch, depth, pose). Guides the image generation."
    ),
  height: z
    .number()
    .optional()
    .describe("Image height (pixels). Set along with width. Range: 64-2000."),
  width: z
    .number()
    .optional()
    .describe("Image width (pixels). Set along with width. Range: 64-2000."),
  step: z
    .number()
    .optional()
    .describe(
      "Number of sampling steps. Higher steps = clearer, more detailed images, but slower. Suggested: 20-40."
    ),
  ar: z
    .string()
    .optional()
    .describe(
      "Aspect ratio of the image in width:height format, e.g., 1:1, 16:9. Must be two positive integers separated by a colon."
    ),
  control_image: z
    .string()
    .optional()
    .describe(
      "Upload reference image for ControlNet (e.g., sketch, depth, pose). Helps guide image generation."
    ),
  model: z
    .string()
    .describe(
      "Base model for image generation. Can be model name (e.g., animagineXl40Opt.Mt5n), hash (e.g., 6327eca98b), or full title (e.g., animagineXl40Opt.Mt5n.safetensors [6327eca98b]). Different models affect style and quality."
    ),
  cfg: z
    .number()
    .optional()
    .describe(
      "Controls how strongly the image follows the prompt. Higher = more faithful, but too high may distort. Suggested: 4–10."
    ),
  sampler: z
    .enum([
      "DPM++ 2M",
      "DPM++ SDE",
      "DPM++ 2M SDE",
      "DPM++ 2M SDE Heun",
      "DPM++ 2S a",
      "DPM++ 3M SDE",
      "Euler a",
      "Euler",
      "LMS",
      "Heun",
      "DPM2",
      "DPM2 a",
      "DPM fast",
      "DPM adaptive",
      "Restart",
      "DDIM",
      "DDIM CFG++",
      "PLMS",
      "UniPC",
      "LCM",
    ])
    .optional()
    .describe(
      "Sampling algorithm. Affects image quality, speed, and style. Recommended: DPM++ series like DPM++ 2M Karras."
    ),
  denoising_strength: z
    .string()
    .optional()
    .describe(
      "Controls how much the image changes. Float (0.0–1.0, 1 decimal place). Higher = more change. 0.3–0.7 is typical, 0.8+ may alter too much."
    ),
  upscaler: z
    .enum(["4x-UltraSharp", "R-ESRGAN", "ESRGAN"])
    .optional()
    .describe(
      "Select the upscaling algorithm for increasing image resolution. Options: Latent, ESRGAN, R-ESRGAN, 4x-UltraSharp, etc."
    ),
  pass_steps: z
    .string()
    .optional()
    .describe(
      "Number of sampling steps in the second pass of Hires Fix. Integer format (e.g., 0, 10, 20). Higher values improve detail but increase processing time."
    ),
  hr_scale: z
    .string()
    .optional()
    .describe(
      "Upscaling factor for Hires Fix. Float (1.0-4.0, 1 decimal place). Determines final image resolution. For example, hr_scale=2.0 doubles the image size."
    ),
  enable_hr: z
    .enum(["True", "False"])
    .optional()
    .describe(
      "Enable Hires Fix (high-resolution repair). String format: 'True' / 'False'. Should be 'True' if hr_scale or related parameters are set."
    ),
  n_iter: z
    .string()
    .optional()
    .describe(
      "Number of iterations (batch count). Integer (≥1). Defines how many times the model runs, generating batch_size images per iteration. For example, with n_iter=3 and batch_size=2, a total of 6 images are produced."
    ),
  restore_faces: z
    .enum(["True", "False"])
    .optional()
    .describe(
      "Enable face restoration (typically using GFPGAN or CodeFormer). String format: 'True' / 'False'. Improves facial features in portraits when enabled."
    ),
  save_meta: z
    .enum(["True", "False"])
    .optional()
    .describe(
      "Whether to save metadata (e.g. prompt and settings) into the image file. String format: 'True' / 'False'. Useful for reproducibility and reference."
    ),
  control_units: z
    .array(
      z.object({
        model: z
          .string()
          .optional()
          .describe(
            "Specifies the model used by ControlNet. Accepts model name (e.g. control_v11p_sd15_openpose), hash (e.g. 8e4777ac), or full title (e.g. control_v11p_sd15_openpose [8e4777ac])."
          ),
        module: z
          .string()
          .optional()
          .describe(
            "Defines the ControlNet preprocessor module type. String format, e.g., 'ip-adapter_clip_sd15' etc. Determines how the input image is interpreted."
          ),
        resize_mode: z
          .enum(["Just Resize", "Crop and Resize", "Resize and Fill"])
          .optional()
          .describe(
            "Defines how the input image is resized to match the generation size. String format, common values: 'Just Resize' - resize directly to target size, 'Crop and Resize' - crop and scale while preserving aspect ratio, 'Resize and Fill' - scale and pad the image to fit"
          ),
        pixel_perfect: z
          .enum(["True", "False"])
          .optional()
          .describe(
            "Enables Pixel Perfect mode, which auto-adjusts preprocessor settings (e.g. resizing). String format: 'True' or 'False'. Preserves input image details more accurately."
          ),
        weight: z
          .number()
          .optional()
          .describe(
            "Defines how strongly the ControlNet input affects the final image. Float (usually 0.0-2.0, 1 decimal place). Higher = stronger control. Default is 1.0."
          ),
        control_mode: z
          .number()
          .default(0)
          .optional()
          .describe(
            "Sets the control priority mode for ControlNet. Integer format: 0 - Balanced (equal influence), 1 - My prompt is more important, 2 - ControlNet is more important"
          ),
        threshold_a: z
          .number()
          .default(0.5)
          .optional()
          .describe(
            "First threshold value for preprocessing module (e.g., edge detection). Float format (usually 0.0-255.0, 1 decimal place). Exact behavior depends on the module."
          ),
        threshold_b: z
          .number()
          .default(0.5)
          .optional()
          .describe(
            "Second threshold value for preprocessing module (e.g., edge detection). Float format (usually 0.0-255.0, 1 decimal place). Used with threshold_a to define sensitivity."
          ),
        guidance_start: z
          .number()
          .default(0.0)
          .optional()
          .describe(
            "Defines when ControlNet influence starts during sampling. Float (0.0-1.0, 1 decimal place). For example, 0.1 means control starts at 10% of the process."
          ),
        guidance_end: z
          .number()
          .default(1.0)
          .optional()
          .describe(
            "Defines when ControlNet influence stops during sampling. Float (0.0-1.0, 1 decimal place). For example, 0.8 means control ends at 80% of the process."
          ),
      })
    )
    .optional()
    .describe(
      "An array of ControlNet units. List format, where each item includes parameters like input_image, model, module, weight, etc. Allows multiple ControlNet modules to be applied together."
    ),
});

export const RawGenerateSchema = z.object({
  prompt: z.string().describe("The prompt to generate the image."),
  negative_prompt: z
    .string()
    .optional()
    .describe("The negative prompt to generate the image."),
  aigc_config: AigcConfigSchema,
});

export const RetryGenerateSchema = z.object({
  image_id: z.string().describe("The image id to retry."),
});

export const CollectionGenerateSchema = z.object({
  collection_id: z
    .number()
    .optional()
    .describe("The collection id used to generate the image."),
  collection_name: z
    .string()
    .optional()
    .describe("The collection name used to generate the image."),
  params: z
    .record(z.string())
    .optional()
    .describe(
      "A key-value map used to replace variable placeholders (e.g. $gender, $bg) in the collection's prompt. Keys should match variable names defined in the collection (without $), and values are their replacements."
    ),
});

export const ListImagesSchema = z.object({
  page: z.number().optional().describe("The page number."),
  page_size: z.number().optional().describe("The page size."),
});

export const ImageStateSchema = z.object({
  image_id: z.string().describe("The image id."),
});

export const TaskStateSchema = z.object({
  task_id: z.string().describe("The generation task id."),
  refresh: z
    .string()
    .default("true")
    .describe("When image is generated, refresh the image state."),
});
