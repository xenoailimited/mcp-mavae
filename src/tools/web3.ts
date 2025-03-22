import { zodToJsonSchema } from "zod-to-json-schema";
import { BaseToolInputSchema } from "../types/common.js";
import { Tool } from "@modelcontextprotocol/sdk/types.js";
import * as WEB3_SCHEMA from "../types/web3.js";

export const WEB3_IMAGE_TOKENIZATION_TOOL: Tool = {
  name: "web3_image_tokenization",
  description:
    "Tokenize images to become NFT (Non-Fungible Token) on the blockchain.",
  inputSchema: zodToJsonSchema(
    WEB3_SCHEMA.ImageTokenizationSchema
  ) as BaseToolInputSchema,
};

export const WEB3_JOB_STATE_TOOL: Tool = {
  name: "web3_job_state",
  description: "Get the state of a job by job id.",
  inputSchema: zodToJsonSchema(
    WEB3_SCHEMA.JobStateSchema
  ) as BaseToolInputSchema,
};
