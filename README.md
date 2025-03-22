# MAVAE - IMAGE TOOLBOX
A powerful creative and editing toolkit designed for AI Agents.

[![smithery badge](https://smithery.ai/badge/@xenoailimited/mavae-image-toolbox)](https://smithery.ai/server/@xenoailimited/mavae-image-toolbox)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MCP](https://img.shields.io/badge/MCP-Model_Context_Protocol-blue?style=for-the-badge)](https://github.com/anthropics/model-context-protocol)
[![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

MAVAE is a Model Context Protocol (MCP) server for interacting with image media tools. It provides a standardized interface for AI Agents to generate and manipulate images.

## 🚀 Features

- **Image Generation**: Generate images using both raw configurations and predefined collections
- **Image Editing**: Compress, crop, and resize images with proportional or fixed dimensions
- **Collection Management**: Create, manage, and share configurations for consistent image generation
- **Model & Lora Management**: List and utilize available models and Loras
- **API Token Management**: Handle authentication for secure interaction with Mavae services

## 📋 Prerequisites

- Node.js (v16 or higher)
- MAVAE API Key (set as environment variable, [Apply here](https://mcp.mavae.ai/))

## 🛠️ Installation

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Start the server
npm start
```

## MCP Json
```json
{
  "mcpServers": {
      "mavae": {
          "command": "node",
          "args": [
              "***/dist/index.js"
          ],
          "env": {
              "MAVAE_API_KEY": MAVAE_API_KEY
          }
      }
  }
}
```
When using MAVAE MCP locally, this path is an absolute path 👉🏻 "***/dist/index.js"

## 🐳 Docker Support

```bash
# Build Docker image
docker build -t mavae-mcp-server .

# Run Docker container
docker run -e MAVAE_API_KEY=your_api_key mavae-mcp-server
```

## 📁 Project Structure

```
mavae/
├── src/                  # Source code
│   ├── actions/          # API endpoint implementation handlers
│   │   ├── aigc.ts       # Image generation operations
│   │   ├── collection.ts # Collection management operations
│   │   ├── edit.ts       # Image editing operations
│   │   └── token.ts      # API token operations
│   ├── tools/            # MCP tool definitions
│   │   ├── aigc.ts       # Image generation tool definitions
│   │   ├── collection.ts # Collection management tool definitions
│   │   └── edit.ts       # Image editing tool definitions
│   ├── types/            # TypeScript type definitions
│   │   ├── aigc.ts       # Image generation types
│   │   ├── collection.ts # Collection types
│   │   ├── edit.ts       # Image editing types
│   │   └── response.ts   # API response types
│   ├── utils/            # Utility functions
│   │   └── constants.ts  # Constant values
│   └── index.ts          # Server entry point
├── dist/                 # Compiled JavaScript files
├── package.json          # Project dependencies and scripts
└── tsconfig.json         # TypeScript configuration
```

## 🛍️ Available Tools

### Image Generation
- `image_raw_generate` - Generate an image using raw AIGC configuration
- `image_collection_generate` - Generate an image using a collection's AIGC configuration
- `image_retry_generate` - Retry a failed image generation
- `image_state` - Get the details of an owned image
- `generate_task_state` - Get the generation state of an image by task id

### Collection Management
- `collection_create` - Create a new collection
- `collection_delete` - Delete a collection
- `collection_toggle_public` - Toggle the public status of a collection
- `collection_list` - Get the list of owned collections
- `collection_state` - Get the details of an owned collection

### Image Editing
- `compress_image` - Lossless compression of images
- `crop_image` - Crop images with local path and URL support
- `resize_image` - Resize images with proportional or fixed dimensions

### Model & Resources
- `list_images` - Get the list of owned images
- `list_loras` - Get the list of available loras
- `list_models` - Get the list of available models

### Authentication
- `token_state` - Get the x-api-token state



