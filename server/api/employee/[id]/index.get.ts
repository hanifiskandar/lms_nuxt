import { $fetch } from 'ofetch';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const id = getRouterParam(event, 'id');

  console.log('test 123');
  // console.log('Cookie header:', getRequestHeader(event, 'cookie'));

  try {
    const response = await $fetch(`http://localhost:8000/api/users/${id}`, {
      method: 'GET',
      credentials: 'include',
    });

    return response;
  } catch (error) {
    console.error("Error from Laravel:", error.data || error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch staff management',
    });
  }
});
