import { z } from "zod";
import {
  CollectionStateSchema,
  CreateCollectionSchema,
  DeleteCollectionSchema,
  ListCollectionsSchema,
  ToggleCollectionPublicSchema,
} from "../types/collection.js";
import { MAVAE_SERVER_API, MAVAE_API_KEY } from "../utils/constants.js";
import * as ServerResponseType from "../types/response.js";

export const handleCollectionCreate = async (
  args: z.infer<typeof CreateCollectionSchema>
) => {
  const url = new URL(`${MAVAE_SERVER_API}/collection/create`);
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-api-token": MAVAE_API_KEY,
    },
    method: "POST",
    body: JSON.stringify(args),
  });
  const data =
    (await response.json()) as ServerResponseType.CreateCollectionResponse;
  if (data?.message != "success") {
    throw new Error(data?.message);
  }
  return {
    content: [
      {
        type: "text",
        text: `Request success. Collection ID: ${data?.data?.collection_id}`,
      },
    ],
    isError: false,
  };
};

export const handleCollectionDelete = async (
  args: z.infer<typeof DeleteCollectionSchema>
) => {
  const url = new URL(`${MAVAE_SERVER_API}/collection/delete`);
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-api-token": MAVAE_API_KEY,
    },
    method: "POST",
    body: JSON.stringify(args),
  });
  const data =
    (await response.json()) as ServerResponseType.DeleteCollectionResponse;
  if (data?.message != "success") {
    throw new Error(data?.message);
  }
  return {
    content: [
      {
        type: "text",
        text: `Request success.`,
      },
    ],
    isError: false,
  };
};

export const handleCollectionTogglePublic = async (
  args: z.infer<typeof ToggleCollectionPublicSchema>
) => {
  const url = new URL(`${MAVAE_SERVER_API}/collection/toggle`);
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-api-token": MAVAE_API_KEY,
    },
    method: "POST",
    body: JSON.stringify(args),
  });
  const data =
    (await response.json()) as ServerResponseType.ToggleCollectionResponse;
  if (data?.message != "success") {
    throw new Error(data?.message);
  }
  return {
    content: [{ type: "text", text: "Request success." }],
    isError: false,
  };
};

export const handleCollectionList = async (
  args: z.infer<typeof ListCollectionsSchema>
) => {
  const url = new URL(`${MAVAE_SERVER_API}/collection/list`);
  url.searchParams.set("page", args.page?.toString() || "1");
  url.searchParams.set("page_size", args.page_size?.toString() || "10");
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      "x-api-token": MAVAE_API_KEY,
    },
    method: "GET",
  });
  const data =
    (await response.json()) as ServerResponseType.ListCollectionsResponse;
  if (data?.message != "success") {
    throw new Error(data?.message);
  }
  return {
    content: [
      {
        type: "text",
        text: `Request success. Owned collections: ${JSON.stringify(
          data?.data
        )}`,
      },
    ],
    isError: false,
  };
};

export const handleCollectionState = async (
  args: z.infer<typeof CollectionStateSchema>
) => {
  const url = new URL(`${MAVAE_SERVER_API}/collection/state`);
  url.searchParams.set("collection_id", args.collection_id?.toString());
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      "x-api-token": MAVAE_API_KEY,
    },
    method: "GET",
  });
  const data =
    (await response.json()) as ServerResponseType.CollectionStateResponse;
  if (data?.message != "success") {
    throw new Error(data?.message);
  }
  return {
    content: [
      {
        type: "text",
        text: `Request success. Collection: ${JSON.stringify(data?.data)}`,
      },
    ],
    isError: false,
  };
};
