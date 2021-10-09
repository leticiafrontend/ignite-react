import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { parseCookies } from "nookies";

export const withSSRAuth = (fn: GetServerSideProps): GetServerSideProps => {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult> => {
    const cookies = parseCookies(ctx);

    if (!cookies["auth-jwt.token"]) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    return await fn(ctx);
  };
};
