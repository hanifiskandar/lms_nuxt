import { $fetch } from "ofetch";
import { getQuery } from "h3";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const query = getQuery(event);
  const cookies = parseCookies(event);

  try {
    const response = await $fetch("/api/leave/export/excel", {
      baseURL: config.public.laravelBaseUrl,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Cookie: Object.entries(cookies)
          .map(([key, value]) => `${key}=${value}`)
          .join("; "),
        "User-Agent": getRequestHeader(event, "user-agent") || "Nuxt/3",
        Origin: config.public.nuxtBaseUrl,
        Referer: config.public.nuxtBaseUrl,
      },
      query,
    });

    return response;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch data",
    });
  }
});
