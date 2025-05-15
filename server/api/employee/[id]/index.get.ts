import { $fetch } from "ofetch";
import { defineEventHandler, parseCookies } from "h3";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const id = getRouterParam(event, "id");
  const cookies = parseCookies(event);
  const xsrfToken = cookies["XSRF-TOKEN"] || "";

  console.log("All cookies:", cookies);
  console.log("XSRF-TOKEN:", xsrfToken);

  try {
    const response = await $fetch(`/api/users/${id}`, {
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
