import { $fetch } from "ofetch";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);

  try {
    const response = await $fetch("/api/setting/states", {
      baseURL: config.public.laravelBaseUrl,
    });

    return response;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch data.",
    });
  }
});
