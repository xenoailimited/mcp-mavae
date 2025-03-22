import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import {
  IMAGE_RAW_GENERATE_TOOL,
  IMAGE_COLLECTION_GENERATE_TOOL,
  IMAGE_RETRY_GENERATE_TOOL,
  IMAGE_STATE_TOOL,
  LIST_IMAGES_TOOL,
  GENERATE_TASK_STATE_TOOL,
  LIST_LORAS_TOOL,
  LIST_MODELS_TOOL,
  COLLECTION_CREATE_TOOL,
  COLLECTION_DELETE_TOOL,
  COLLECTION_TOGGLE_PUBLIC_TOOL,
  COLLECTION_LIST_TOOL,
  COLLECTION_STATE_TOOL,
  TOKEN_STATE_TOOL,
  EDIT_COMPRESS_IMAGE_TOOL,
  EDIT_CROP_IMAGE_TOOL,
  WEB3_IMAGE_TOKENIZATION_TOOL,
  WEB3_JOB_STATE_TOOL,
  EDIT_RESIZE_IMAGE_TOOL,
} from "./tools/index.js";
import {
  handleImageRawGenerate,
  handleImageCollectionGenerate,
  handleImageRetryGenerate,
  handleImageState,
  handleListImages,
  handleGenerateTaskState,
  handleListLoras,
  handleListModels,
  handleCollectionCreate,
  handleCollectionDelete,
  handleCollectionTogglePublic,
  handleCollectionList,
  handleCollectionState,
  handleTokenState,
  handleEditCompressImage,
  handleEditCropImage,
  handleImageTokenization,
  handleWeb3JobState,
  handleEditResizeImage,
} from "./actions/index.js";
import * as Schema from "./types/index.js";

const server = new Server(
  {
    name: "mavae-mcp-server",
    version: "0.1.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Check for API key
const MAVAE_API_KEY = process.env.MAVAE_API_KEY;
if (!MAVAE_API_KEY) {
  console.error("Error: MAVAE_API_KEY environment variable is required");
  process.exit(1);
}

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      IMAGE_RAW_GENERATE_TOOL,
      IMAGE_COLLECTION_GENERATE_TOOL,
      IMAGE_RETRY_GENERATE_TOOL,
      IMAGE_STATE_TOOL,
      LIST_IMAGES_TOOL,
      GENERATE_TASK_STATE_TOOL,
      LIST_LORAS_TOOL,
      LIST_MODELS_TOOL,
      COLLECTION_CREATE_TOOL,
      COLLECTION_DELETE_TOOL,
      COLLECTION_TOGGLE_PUBLIC_TOOL,
      COLLECTION_LIST_TOOL,
      COLLECTION_STATE_TOOL,
      TOKEN_STATE_TOOL,
      EDIT_COMPRESS_IMAGE_TOOL,
      EDIT_CROP_IMAGE_TOOL,
      WEB3_IMAGE_TOKENIZATION_TOOL,
      WEB3_JOB_STATE_TOOL,
      EDIT_RESIZE_IMAGE_TOOL,
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {
    const { name, arguments: args } = request.params;

    if (!args) {
      throw new Error("Arguments are required");
    }

    switch (name) {
      case IMAGE_RAW_GENERATE_TOOL.name: {
        const formatArgs = Schema.RawGenerateSchema.parse(args);
        return await handleImageRawGenerate(formatArgs);
      }
      case IMAGE_COLLECTION_GENERATE_TOOL.name: {
        const formatArgs = Schema.CollectionGenerateSchema.parse(args);
        return await handleImageCollectionGenerate(formatArgs);
      }
      case IMAGE_RETRY_GENERATE_TOOL.name: {
        const formatArgs = Schema.RetryGenerateSchema.parse(args);
        return await handleImageRetryGenerate(formatArgs);
      }
      case LIST_IMAGES_TOOL.name: {
        const formatArgs = Schema.ListImagesSchema.parse(args);
        return await handleListImages(formatArgs);
      }
      case IMAGE_STATE_TOOL.name: {
        const formatArgs = Schema.ImageStateSchema.parse(args);
        return await handleImageState(formatArgs);
      }
      case GENERATE_TASK_STATE_TOOL.name: {
        const formatArgs = Schema.TaskStateSchema.parse(args);
        return await handleGenerateTaskState(formatArgs);
      }
      case LIST_LORAS_TOOL.name: {
        return await handleListLoras();
      }
      case LIST_MODELS_TOOL.name: {
        return await handleListModels();
      }
      case COLLECTION_CREATE_TOOL.name: {
        const formatArgs = Schema.CreateCollectionSchema.parse(args);
        return await handleCollectionCreate(formatArgs);
      }
      case COLLECTION_DELETE_TOOL.name: {
        const formatArgs = Schema.DeleteCollectionSchema.parse(args);
        return await handleCollectionDelete(formatArgs);
      }
      case COLLECTION_TOGGLE_PUBLIC_TOOL.name: {
        const formatArgs = Schema.ToggleCollectionPublicSchema.parse(args);
        return await handleCollectionTogglePublic(formatArgs);
      }
      case COLLECTION_LIST_TOOL.name: {
        const formatArgs = Schema.ListCollectionsSchema.parse(args);
        return await handleCollectionList(formatArgs);
      }
      case COLLECTION_STATE_TOOL.name: {
        const formatArgs = Schema.CollectionStateSchema.parse(args);
        return await handleCollectionState(formatArgs);
      }
      case TOKEN_STATE_TOOL.name: {
        return await handleTokenState();
      }
      case EDIT_COMPRESS_IMAGE_TOOL.name: {
        const formatArgs = Schema.CompressImageSchema.parse(args);
        return await handleEditCompressImage(formatArgs);
      }
      case EDIT_CROP_IMAGE_TOOL.name: {
        const formatArgs = Schema.CropImageSchema.parse(args);
        return await handleEditCropImage(formatArgs);
      }
      case WEB3_IMAGE_TOKENIZATION_TOOL.name: {
        const formatArgs = Schema.ImageTokenizationSchema.parse(args);
        return await handleImageTokenization(formatArgs);
      }
      case WEB3_JOB_STATE_TOOL.name: {
        const formatArgs = Schema.JobStateSchema.parse(args);
        return await handleWeb3JobState(formatArgs);
      }
      case EDIT_RESIZE_IMAGE_TOOL.name: {
        const formatArgs = Schema.ResizeImageSchema.parse(args);
        return await handleEditResizeImage(formatArgs);
      }
      default:
        return {
          content: [{ type: "text", text: `Unknown tool: ${name}` }],
          isError: true,
        };
    }
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `Error: ${
            error instanceof Error ? error.message : String(error)
          }`,
        },
      ],
      isError: true,
    };
  }
});

async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Mavae MCP Server running on stdio");
}

runServer().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
