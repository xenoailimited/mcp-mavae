import { MAVAE_SERVER_API, MAVAE_API_KEY } from "../utils/constants.js";
import * as ServerResponseType from "../types/response.js";

export const handleTokenState = async () => {
  const url = new URL(`${MAVAE_SERVER_API}/token/state`);
  url.searchParams.set("refresh", "true");

  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      "x-api-token": MAVAE_API_KEY,
    },
    method: "GET",
  });
  const data = (await response.json()) as ServerResponseType.TokenResponse;
  if (data?.message != "success") {
    throw new Error(data?.message);
  }
  return {
    content: [
      {
        type: "text",
        text: `Request success. Token: ${JSON.stringify(data?.data)}`,
      },
    ],
    isError: false,
  };
};
