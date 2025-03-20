import { z } from "zod";

export const CompressImageSchema = z.object({
  inputs: z
    .array(z.string())
    .describe("The URLs or paths of the images to compress."),
  quality: z
    .number()
    .optional()
    .describe("The quality of the compressed image.")
    .default(80),
  outputPath: z
    .string()
    .optional()
    .describe("The path to save the compressed image."),
});

export const CropImageSchema = z.object({
  inputs: z
    .array(z.string())
    .describe("The URLs or paths of the images to crop."),
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
    .describe("The path to save the cropped image."),
});
