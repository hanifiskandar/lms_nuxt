import { $fetch } from "ofetch";
import { defineEventHandler, parseCookies } from "h3";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const id = getRouterParam(event, "id");
  const cookies = parseCookies(event);

  try {
    const response = await $fetch(`/api/departments/${id}`, {
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
    });

    return response;
  } catch (error) {
    console.error("Error from Laravel:", error.data || error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: `Failed to fetch staff management: ${error.message}`,
    });
  }
});
