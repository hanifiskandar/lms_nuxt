import { $fetch } from "ofetch";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  // const body = await readBody(event); // Optional if you're no longer using JSON body

  try {
    const response = await $fetch("/api/leave-requests", {
      baseURL: config.public.laravelBaseUrl,
      method: "POST",
      body: event.node.req, // Pass the raw incoming request (with multipart form)
    });

    return response;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to store data",
    });
  }
});
