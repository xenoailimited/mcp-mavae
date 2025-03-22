import { z } from "zod";
import { MAVAE_SERVER_API, MAVAE_API_KEY } from "../utils/constants.js";
import * as ServerResponseType from "../types/response.js";
import { ImageTokenizationSchema, JobStateSchema } from "../types/web3.js";

export const handleImageTokenization = async (
  args: z.infer<typeof ImageTokenizationSchema>
) => {
  const url = new URL(`${MAVAE_SERVER_API}/web3/tokenization/image`);
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
    (await response.json()) as ServerResponseType.ImageTokenizationResponse;
  if (data?.message != "success") {
    throw new Error(data?.message);
  }
  return {
    content: [
      {
        type: "text",
        text: `Request success. Job id: ${data?.data?.job_id}`,
      },
    ],
    isError: false,
  };
};

export const handleWeb3JobState = async (
  args: z.infer<typeof JobStateSchema>
) => {
  const url = new URL(`${MAVAE_SERVER_API}/web3/job_state`);
  url.searchParams.set("job_id", args.job_id?.toString());
  url.searchParams.set("job_type", args.job_type?.toString());
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      "x-api-token": MAVAE_API_KEY,
    },
    method: "GET",
  });
  const data =
    (await response.json()) as ServerResponseType.Web3JobStateResponse;
  if (data?.message != "success") {
    throw new Error(data?.message);
  }
  return {
    content: [
      {
        type: "text",
        text: `Request success. Job state: ${JSON.stringify(data?.data)}`,
      },
    ],
    isError: false,
  };
};
