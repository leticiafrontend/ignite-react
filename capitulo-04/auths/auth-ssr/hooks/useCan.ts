import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { validationUserPermissions } from "../utils/validationUserPermissions";

type UseCanParams = {
  permissions?: string[];
  roles?: string[];
};

export const useCan = ({ permissions, roles }: UseCanParams) => {
  const { user, isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) return false;

  const userHasValidPermissions = validationUserPermissions({
    user,
    permissions,
    roles,
  });

  return userHasValidPermissions;
};
