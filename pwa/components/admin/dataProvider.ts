"use client";

import { fetchHydra, hydraDataProvider } from "@api-platform/admin";
import { parseHydraDocumentation } from "@api-platform/api-doc-parser";
import { getAccessToken } from "./getAccessToken";

const apiDocumentationParser = (accessToken: string | null) => async () => {
  try {
    return await parseHydraDocumentation(
      /* @ts-ignore */
      window.origin,
      {
        headers: {
          // @ts-ignore
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  } catch (result) {
    // @ts-ignore
    const { api, response, status } = result;
    if (status !== 401 || !response) {
      throw result;
    }
    return {
      api,
      response,
      status,
    };
  }
};

export const dataProvider = hydraDataProvider({
  /* @ts-ignore */
  entrypoint: window.origin,
  httpClient: (url: URL, options = {}) =>
    fetchHydra(url, {
      ...options,
      headers: {
        // @ts-ignore
        Authorization: `Bearer ${getAccessToken()}`,
      },
    }),
  apiDocumentationParser: apiDocumentationParser(getAccessToken()),
});
