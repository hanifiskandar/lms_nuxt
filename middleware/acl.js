export default defineNuxtRouteMiddleware((to, from) => {
  const { user } = useAuth();

  if (!user.value.loggedIn) {
    return navigateTo("/login");
  }

  const routePermissions = {
    "/kawalan-capaian/new": "view",
  };

  const requiredPermission = routePermissions[to.path] || "view";

  console.log(
    "Role:",
    user.value.role,
    "Has view?",
    hasPermission(user.value.role, "view")
  );

  
  if (!hasPermission(user.value.role, requiredPermission)) {
    return navigateTo("/403");
  }
});
