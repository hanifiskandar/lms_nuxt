import { $fetch } from "ofetch";
import { getQuery } from "h3";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const body = await readBody(event);
  const id = getRouterParam(event, "id");
  const query = getQuery(event);

  console.log('ola');

  try {
    const response = await $fetch(`/api/users/${id}`, {
      baseURL: config.public.laravelBaseUrl,
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body,
      query,
    });

    return response;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to update data",
    });
  }
});
