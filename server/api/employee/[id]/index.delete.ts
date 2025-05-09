import { $fetch } from "ofetch";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const body = await readBody(event);
  const id = getRouterParam(event, "id");

  try {
    const response = await $fetch(`/api/users/${id}`, {
      baseURL: config.public.laravelBaseUrl,
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body,
    });

    return response;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to delete data",
    });
  }
});
