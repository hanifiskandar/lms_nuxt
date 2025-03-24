export const permissions = {
  admin: ["view", "edit", "delete"],
  user: ["view"],
};

export const hasPermission = (role, action) => {
  if (!role) return false;
  return permissions[role]?.includes(action) || false;
};
