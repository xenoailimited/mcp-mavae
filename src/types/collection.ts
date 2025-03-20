import { z } from "zod";
import { AigcConfigSchema } from "./aigc.js";

export const CreateCollectionSchema = z.object({
  name: z.string().describe("The name of the collection."),
  description: z
    .string()
    .optional()
    .describe("The description of the collection."),
  prompt: z.string().describe("The prompt of the collection."),
  negative_prompt: z.string().optional().describe("The negative prompt."),
  variables: z
    .array(z.string())
    .optional()
    .describe("Variables that can be replaced in prompt."),
  train_server: z
    .string()
    .default("sd")
    .optional()
    .describe("The used aigc server of the collection."),
  aigc_config: AigcConfigSchema,
  public: z
    .boolean()
    .default(true)
    .optional()
    .describe("Whether the collection is public."),
});

export const DeleteCollectionSchema = z.object({
  collection_id: z.number().describe("The collection id to delete."),
});

export const ToggleCollectionPublicSchema = z.object({
  collection_id: z.number().describe("The collection id to toggle public."),
});

export const ListCollectionsSchema = z.object({
  page: z.number().optional().describe("The page."),
  page_size: z.number().optional().describe("The page size."),
});

export const CollectionStateSchema = z.object({
  collection_id: z.number().describe("The collection id."),
});
