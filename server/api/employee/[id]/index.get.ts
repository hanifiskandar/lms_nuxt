import { $fetch } from "ofetch";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const id = getRouterParam(event, "id");

  try {
    const response = await $fetch(`/api/users/${id}`, {
      baseURL: config.public.laravelBaseUrl,
      method: "GET",
    });

    return response;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch statff management",
    });
  }
});
