import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { BaseToolInputSchema } from "../types/common.js";

export const TOKEN_STATE_TOOL = {
  name: "token_state",
  description: "Get the x-api-token state.",
  inputSchema: zodToJsonSchema(z.object({})) as BaseToolInputSchema,
};
