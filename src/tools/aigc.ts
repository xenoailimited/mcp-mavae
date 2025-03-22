import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import * as AIGC_SCHEMA from "../types/aigc.js";
import { BaseToolInputSchema } from "../types/common.js";

export const IMAGE_RAW_GENERATE_TOOL = {
  name: "image_raw_generate",
  description: "Generate an image using raw AIGC configuration. Usually, check the generation status 10 seconds after starting the image generation to allow sufficient time for the process.",
  inputSchema: zodToJsonSchema(
    AIGC_SCHEMA.RawGenerateSchema
  ) as BaseToolInputSchema,
};

export const IMAGE_COLLECTION_GENERATE_TOOL = {
  name: "image_collection_generate",
  description: "Generate an image using a collection's AIGC configuration. You need to first check the collection details to understand its variables so you can call it correctly. Usually, check the generation status 10 seconds after starting the image generation to allow sufficient time for the process.",
  inputSchema: zodToJsonSchema(
    AIGC_SCHEMA.CollectionGenerateSchema
  ) as BaseToolInputSchema,
};

export const IMAGE_RETRY_GENERATE_TOOL = {
  name: "image_retry_generate",
  description: "Retry a failed image generation. Usually, check the generation status 10 seconds after starting the image generation to allow sufficient time for the process.",
  inputSchema: zodToJsonSchema(
    AIGC_SCHEMA.RetryGenerateSchema
  ) as BaseToolInputSchema,
};

export const LIST_IMAGES_TOOL = {
  name: "list_images",
  description: "Get the list of owned images.",
  inputSchema: zodToJsonSchema(
    AIGC_SCHEMA.ListImagesSchema
  ) as BaseToolInputSchema,
};

export const IMAGE_STATE_TOOL = {
  name: "image_state",
  description: "Get the details of an owned image.",
  inputSchema: zodToJsonSchema(
    AIGC_SCHEMA.ImageStateSchema
  ) as BaseToolInputSchema,
};

export const GENERATE_TASK_STATE_TOOL = {
  name: "generate_task_state",
  description: "Get the generation state of an image by task id. Usually, check the generation status 10 seconds after starting the image generation to allow sufficient time for the process.",
  inputSchema: zodToJsonSchema(
    AIGC_SCHEMA.TaskStateSchema
  ) as BaseToolInputSchema,
};

export const LIST_LORAS_TOOL = {
  name: "list_loras",
  description: "Get the list of available loras.",
  inputSchema: zodToJsonSchema(z.object({})) as BaseToolInputSchema,
};

export const LIST_MODELS_TOOL = {
  name: "list_models",
  description: "Get the list of available models.",
  inputSchema: zodToJsonSchema(z.object({})) as BaseToolInputSchema,
};
