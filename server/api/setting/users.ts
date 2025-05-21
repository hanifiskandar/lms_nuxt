import { $fetch } from "ofetch";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const cookies = parseCookies(event);

  try {
    const response = await $fetch("/api/setting/users", {
      baseURL: config.public.laravelBaseUrl,
      headers: {
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
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch data.",
    });
  }
});
