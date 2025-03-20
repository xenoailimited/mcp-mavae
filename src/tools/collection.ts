import { zodToJsonSchema } from "zod-to-json-schema";
import * as COLLECTION_SCHEMA from "../types/collection.js";
import { BaseToolInputSchema } from "../types/common.js";

export const COLLECTION_CREATE_TOOL = {
  name: "collection_create",
  description: "Create a new collection.",
  inputSchema: zodToJsonSchema(
    COLLECTION_SCHEMA.CreateCollectionSchema
  ) as BaseToolInputSchema,
};

export const COLLECTION_DELETE_TOOL = {
  name: "collection_delete",
  description: "Delete a collection.",
  inputSchema: zodToJsonSchema(
    COLLECTION_SCHEMA.DeleteCollectionSchema
  ) as BaseToolInputSchema,
};

export const COLLECTION_TOGGLE_PUBLIC_TOOL = {
  name: "collection_toggle_public",
  description: "Toggle the public status of a collection.",
  inputSchema: zodToJsonSchema(
    COLLECTION_SCHEMA.ToggleCollectionPublicSchema
  ) as BaseToolInputSchema,
};

export const COLLECTION_LIST_TOOL = {
  name: "collection_list",
  description: "Get the list of owned collections.",
  inputSchema: zodToJsonSchema(
    COLLECTION_SCHEMA.ListCollectionsSchema
  ) as BaseToolInputSchema,
};

export const COLLECTION_STATE_TOOL = {
  name: "collection_state",
  description: "Get the details of an owned collection.",
  inputSchema: zodToJsonSchema(
    COLLECTION_SCHEMA.CollectionStateSchema
  ) as BaseToolInputSchema,
};
