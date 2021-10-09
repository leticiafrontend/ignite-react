import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { destroyCookie, parseCookies } from "nookies";
import { AuthTokenError } from "../erros/AuthTokenError";
import decode from "jwt-decode";
import { validationUserPermissions } from "./validationUserPermissions";

type withSSRAuthOptions = {
  permissions?: string[];
  roles?: string[];
};

export const withSSRAuth = (
  fn: GetServerSideProps,
  options?: withSSRAuthOptions
): GetServerSideProps => {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult> => {
    const cookies = parseCookies(ctx);
    const token = cookies["auth-jwt.token"];

    if (!token) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    if (options) {
      const user = decode<{ permissions: string[]; roles: string[] }>(token);
      const { permissions, roles } = options;

      const userHasValidPermissions = validationUserPermissions({
        user,
        permissions,
        roles,
      });

      if (!userHasValidPermissions) {
        return {
          redirect: {
            destination: "/",
            permanent: false,
          },
        };
      }
    }

    try {
      return await fn(ctx);
    } catch (err) {
      if (err instanceof AuthTokenError) {
        destroyCookie(ctx, "auth-jwt.token");
        destroyCookie(ctx, "auth-jwt.refreshToken");
        return {
          redirect: {
            destination: "/",
            permanent: false,
          },
        };
      }
    }
  };
};
