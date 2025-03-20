import { zodToJsonSchema } from "zod-to-json-schema";
import * as EDIT_SCHEMA from "../types/edit.js";
import { Tool } from "@modelcontextprotocol/sdk/types.js";
import { BaseToolInputSchema } from "../types/common.js";

export const EDIT_COMPRESS_IMAGE_TOOL: Tool = {
  name: "compress_image",
  description:
    "Lossless compression of images (PNG, JPEG, WebP, GIF), support for local paths and URLs.",
  inputSchema: zodToJsonSchema(
    EDIT_SCHEMA.CompressImageSchema
  ) as BaseToolInputSchema,
};

export const EDIT_CROP_IMAGE_TOOL: Tool = {
  name: "crop_image",
  description:
    "Crop images (PNG, JPEG, WebP, GIF) with local path and URL support",
  inputSchema: zodToJsonSchema(
    EDIT_SCHEMA.CropImageSchema
  ) as BaseToolInputSchema,
};
