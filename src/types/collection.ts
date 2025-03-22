import { z } from "zod";
import { AigcConfigSchema } from "./aigc.js";

export const CreateCollectionSchema = z.object({
  name: z.string().describe("The name of the collection."),
  description: z
    .string()
    .optional()
    .describe("The description of the collection."),
  prompt: z
    .string()
    .describe(
      "The base prompt string that supports variable placeholders using $variable syntax, e.g., 'portrait, 1 $gender, $clothing $style'. Variables will be dynamically replaced at image generation time."
    ),
  negative_prompt: z.string().optional().describe("The negative prompt."),
  variables: z
    .array(z.string())
    .optional()
    .describe(
      "A list of variable names (without $) that are used in the prompt string, e.g., ['gender', 'clothing', 'style']. These will be replaced by values at generation time."
    ),
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
  collection_id: z.number().optional().describe("The collection id to delete."),
  collection_name: z
    .string()
    .optional()
    .describe("The collection name to delete."),
});

export const ToggleCollectionPublicSchema = z.object({
  collection_id: z
    .number()
    .optional()
    .describe("The collection id to toggle public."),
  collection_name: z
    .string()
    .optional()
    .describe("The collection name to toggle public."),
});

export const ListCollectionsSchema = z.object({
  collection_name: z
    .string()
    .optional()
    .describe("The collection name to filter."),
  page: z.number().optional().describe("The page."),
  page_size: z.number().optional().describe("The page size."),
});

export const CollectionStateSchema = z.object({
  collection_id: z.number().describe("The collection id."),
});
