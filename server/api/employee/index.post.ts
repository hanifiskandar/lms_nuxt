import { $fetch } from "ofetch";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const body = await readBody(event);

  try {
    const response = await $fetch("/api/users", {
      baseURL: config.public.laravelBaseUrl,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });

    return response;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to store data",
    });
  }
});
