import { $fetch } from "ofetch";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const cookies = parseCookies(event);
  const formData = await readFormData(event);


  try {
    const response = await $fetch("/api/leave-requests", {
      baseURL: config.public.laravelBaseUrl,
      method: "POST",
      body: formData, // Pass the raw incoming request (with multipart form)
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
      statusMessage: "Failed to store data",
    });
  }
});
