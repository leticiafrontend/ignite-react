import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { parseCookies } from "nookies";

export const withSSRGuest = (fn: GetServerSideProps): GetServerSideProps => {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult> => {
    const cookies = parseCookies(ctx);

    if (cookies["auth-jwt.token"]) {
      return {
        redirect: {
          destination: "/dashboard",
          permanent: false,
        },
      };
    }

    return await fn(ctx);
  };
};
