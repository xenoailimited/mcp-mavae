import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import * as AIGC_SCHEMA from "../types/aigc.js";
import { BaseToolInputSchema } from "../types/common.js";

export const AIGC_RAW_TOOL = {
  name: "aigc_raw_generate",
  description: "Generate an image using raw AIGC configuration.",
  inputSchema: zodToJsonSchema(
    AIGC_SCHEMA.RawGenerateSchema
  ) as BaseToolInputSchema,
};

export const AIGC_COLLECTION_TOOL = {
  name: "aigc_collection_generate",
  description: "Generate an image using a collection's AIGC configuration.",
  inputSchema: zodToJsonSchema(
    AIGC_SCHEMA.CollectionGenerateSchema
  ) as BaseToolInputSchema,
};

export const AIGC_RETRY_TOOL = {
  name: "aigc_retry_generate",
  description: "Retry a failed image generation.",
  inputSchema: zodToJsonSchema(
    AIGC_SCHEMA.RetryGenerateSchema
  ) as BaseToolInputSchema,
};

export const AIGC_IMAGES_TOOL = {
  name: "aigc_list_images",
  description: "Get the list of owned images.",
  inputSchema: zodToJsonSchema(
    AIGC_SCHEMA.ListImagesSchema
  ) as BaseToolInputSchema,
};

export const AIGC_IMAGE_TOOL = {
  name: "aigc_image_state",
  description: "Get the details of an owned image.",
  inputSchema: zodToJsonSchema(
    AIGC_SCHEMA.ImageStateSchema
  ) as BaseToolInputSchema,
};

export const AIGC_TASK_STATE_TOOL = {
  name: "aigc_task_state",
  description: "Get the generation state of an image by task id.",
  inputSchema: zodToJsonSchema(
    AIGC_SCHEMA.TaskStateSchema
  ) as BaseToolInputSchema,
};

export const AIGC_LORAS_TOOL = {
  name: "aigc_loras",
  description: "Get the list of available loras.",
  inputSchema: zodToJsonSchema(z.object({})) as BaseToolInputSchema,
};

export const AIGC_MODELS_TOOL = {
  name: "aigc_models",
  description: "Get the list of available models.",
  inputSchema: zodToJsonSchema(z.object({})) as BaseToolInputSchema,
};
