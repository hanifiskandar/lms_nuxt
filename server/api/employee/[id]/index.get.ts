import { $fetch } from "ofetch";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const xsrfToken = getCookie(event, "XSRF-TOKEN") || "";
  // const cookies = getCookies(event); // Get all cookies
  // console.log("Cookies:", cookies); // Debug cookies

  try {
    const response = await $fetch(`http://localhost:8000/api/users/${id}`, {
      method: "GET",
      headers: {
        "X-XSRF-TOKEN": xsrfToken,
        Accept: "application/json",
        // Cookie: Object.entries(cookies)
        //   .map(([key, value]) => `${key}=${value}`)
        //   .join("; "), // Forward all cookies
      },
    });

    return response;
  } catch (error) {
    console.error("Fetch error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: `Failed to fetch staff management: ${error.message}`,
    });
  }
});
