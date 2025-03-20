import { z } from "zod";

export const AigcConfigSchema = z.object({
  seed: z.string().optional().describe(""),
  image_url: z
    .string()
    .optional()
    .describe("The seed parameter in the stable diffusion"),
  height: z.number().optional().describe("The height of the image."),
  width: z.number().optional().describe("The width of the image."),
  step: z
    .number()
    .optional()
    .describe("The step parameter in the stable diffusion"),
  ar: z.string().optional().describe("The aspect ratio of the image."),
  control_image: z.string().optional().describe("The control image url."),
  model: z.string().describe("The model hash in the stable diffusion."),
  cfg: z.number().optional().describe("The cfg in the stable diffusion."),
  sampler: z
    .string()
    .optional()
    .describe("The sampler in the stable diffusion."),
  denoising_strength: z
    .string()
    .optional()
    .describe("The denoising strength in the stable diffusion."),
  upscaler: z
    .string()
    .optional()
    .describe("The upscaler in the stable diffusion."),
  pass_steps: z
    .string()
    .optional()
    .describe("The pass steps in the stable diffusion."),
  hr_scale: z
    .string()
    .optional()
    .describe("The hr scale in the stable diffusion."),
  enable_hr: z
    .string()
    .optional()
    .describe("The enable hr in the stable diffusion."),
  n_iter: z.string().optional().describe("The n iter in the stable diffusion."),
  restore_faces: z
    .string()
    .optional()
    .describe("The restore faces in the stable diffusion."),
  save_meta: z
    .string()
    .optional()
    .describe("The save meta in the stable diffusion."),
  control_units: z
    .array(
      z.object({
        model: z
          .string()
          .optional()
          .describe("The model hash in the stable diffusion."),
        module: z
          .string()
          .optional()
          .describe("The module in the stable diffusion."),
        resize_mode: z
          .string()
          .optional()
          .describe("The resize mode in the stable diffusion."),
        pixel_perfect: z
          .boolean()
          .optional()
          .describe("The pixel perfect in the stable diffusion."),
        weight: z
          .number()
          .optional()
          .describe("The weight in the stable diffusion."),
        control_mode: z
          .number()
          .optional()
          .describe("The control mode in the stable diffusion."),
        threshold_a: z
          .number()
          .optional()
          .describe("The threshold a in the stable diffusion."),
        threshold_b: z
          .number()
          .optional()
          .describe("The threshold b in the stable diffusion."),
        guidance_end: z
          .number()
          .optional()
          .describe("The guidance end in the stable diffusion."),
        guidance_start: z
          .number()
          .optional()
          .describe("The guidance start in the stable diffusion."),
      })
    )
    .optional()
    .describe("The control units in the stable diffusion."),
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
      "Some parameters are used to replace the corresponding placeholders in the cue words."
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
