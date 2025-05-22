import { $fetch } from "ofetch";
import { getQuery } from "h3";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const body = await readBody(event);
  const id = getRouterParam(event, "id");
  const query = getQuery(event);


  try {
    const response = await $fetch(`/api/leave/approval/reject/${id}`, {
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
