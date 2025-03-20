import { z } from "zod";
import {
  RawGenerateSchema,
  CollectionGenerateSchema,
  RetryGenerateSchema,
  ListImagesSchema,
  ImageStateSchema,
  TaskStateSchema,
} from "../types/aigc.js";
import { MAVAE_SERVER_API, MAVAE_API_KEY } from "../utils/constants.js";
import * as ServerResponseType from "../types/response.js";

export const handleImageRawGenerate = async (
  args: z.infer<typeof RawGenerateSchema>
) => {
  const url = new URL(`${MAVAE_SERVER_API}/aigc/raw`);
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-api-token": MAVAE_API_KEY,
    },
    method: "POST",
    body: JSON.stringify(args),
  });
  const data = (await response.json()) as ServerResponseType.GenerateResponse;
  if (data?.message != "success") {
    throw new Error(data?.message);
  }

  return {
    content: [
      {
        type: "text",
        text: `Request success. Task ID: ${data?.data?.task_id}, Image ID: ${data?.data?.image_id}`,
      },
    ],
    isError: false,
  };
};

export const handleImageCollectionGenerate = async (
  args: z.infer<typeof CollectionGenerateSchema>
) => {
  const url = new URL(`${MAVAE_SERVER_API}/aigc/collection`);
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-api-token": MAVAE_API_KEY,
    },
    method: "POST",
    body: JSON.stringify(args),
  });
  const data = (await response.json()) as ServerResponseType.GenerateResponse;
  if (data?.message != "success") {
    throw new Error(data?.message);
  }
  return {
    content: [
      {
        type: "text",
        text: `Request success. Task ID: ${data?.data?.task_id}, Image ID: ${data?.data?.image_id}`,
      },
    ],
    isError: false,
  };
};

export const handleImageRetryGenerate = async (
  args: z.infer<typeof RetryGenerateSchema>
) => {
  const url = new URL(`${MAVAE_SERVER_API}/aigc/retry`);
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-api-token": MAVAE_API_KEY,
    },
    method: "POST",
    body: JSON.stringify(args),
  });
  const data = (await response.json()) as ServerResponseType.GenerateResponse;
  if (data?.message != "success") {
    throw new Error(data?.message);
  }
  return {
    content: [
      {
        type: "text",
        text: `Request success. Task ID: ${data?.data?.task_id}, Image ID: ${data?.data?.image_id}`,
      },
    ],
    isError: false,
  };
};

export const handleListImages = async (
  args: z.infer<typeof ListImagesSchema>
) => {
  const url = new URL(`${MAVAE_SERVER_API}/aigc/list`);
  url.searchParams.set("page", args.page?.toString() || "1");
  url.searchParams.set("page_size", args.page_size?.toString() || "10");

  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      "x-api-token": MAVAE_API_KEY,
    },
    method: "GET",
  });
  const data = (await response.json()) as ServerResponseType.ListImagesResponse;
  if (data?.message != "success") {
    throw new Error(data?.message);
  }
  return {
    content: [
      {
        type: "text",
        text: `Request success. Owned images: ${JSON.stringify(data?.data)}`,
      },
    ],
    isError: false,
  };
};

export const handleImageState = async (
  args: z.infer<typeof ImageStateSchema>
) => {
  const url = new URL(`${MAVAE_SERVER_API}/aigc/state`);
  url.searchParams.set("image_id", args.image_id?.toString());

  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      "x-api-token": MAVAE_API_KEY,
    },
    method: "GET",
  });
  const data = (await response.json()) as ServerResponseType.ImageStateResponse;
  if (data?.message != "success") {
    throw new Error(data?.message);
  }
  return {
    content: [
      {
        type: "text",
        text: `Request success. Owned image: ${JSON.stringify(data?.data)}`,
      },
    ],
    isError: false,
  };
};

export const handleGenerateTaskState = async (
  args: z.infer<typeof TaskStateSchema>
) => {
  const url = new URL(`${MAVAE_SERVER_API}/aigc/task_state`);
  url.searchParams.set("task_id", args.task_id?.toString());
  url.searchParams.set("refresh", args.refresh?.toString());
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      "x-api-token": MAVAE_API_KEY,
    },
    method: "GET",
  });
  const data = (await response.json()) as ServerResponseType.TaskStateResponse;
  return {
    content: [
      {
        type: "text",
        text: `Request success. Generation state: ${JSON.stringify(
          data?.data
        )}`,
      },
    ],
    isError: false,
  };
};

export const handleListLoras = async () => {
  const url = new URL(`${MAVAE_SERVER_API}/aigc/loras`);
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      "x-api-token": MAVAE_API_KEY,
    },
    method: "GET",
  });
  const data = (await response.json()) as ServerResponseType.LorasResponse;
  return {
    content: [
      {
        type: "text",
        text: `Request success. Loras: ${JSON.stringify(data?.data)}`,
      },
    ],
    isError: false,
  };
};

export const handleListModels = async () => {
  const url = new URL(`${MAVAE_SERVER_API}/aigc/models`);
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      "x-api-token": MAVAE_API_KEY,
    },
    method: "GET",
  });
  const data = (await response.json()) as ServerResponseType.ModelsResponse;
  return {
    content: [
      {
        type: "text",
        text: `Request success. Models: ${JSON.stringify(data?.data)}`,
      },
    ],
    isError: false,
  };
};
