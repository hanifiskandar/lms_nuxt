import { $fetch } from "ofetch";
import { getQuery } from "h3";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const query = getQuery(event);

  try {
    const response = await $fetch("/api/users", {
      baseURL: config.public.laravelBaseUrl,
      method: "GET",
      query,
    });

    return response;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch data",
    });
  }
});
