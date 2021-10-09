import axios, { AxiosError } from "axios";
import Router from "next/router";
import { parseCookies, setCookie, destroyCookie } from "nookies";

let isRefreshing = false;
let failedRequestsQueue = [];

export const setupAPIClient = (ctx = undefined) => {
  let cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL: "http://localhost:3333",
    headers: {
      Authorization: `Bearer ${cookies["auth-jwt.token"]}`,
    },
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        if (error.response.data?.code === "token.expired") {
          cookies = parseCookies(ctx);

          const { "auth-jwt.refreshToken": refreshToken } = cookies;
          const originalConfig = error.config;

          if (!isRefreshing) {
            isRefreshing = true;

            api
              .post("/refresh", {
                refreshToken,
              })
              .then((response) => {
                const { token } = response.data;

                setCookie(ctx, "auth-jwt.token", token, {
                  maxAge: 60 * 60 * 24 * 30, // 30 dias
                  path: "/",
                });
                setCookie(
                  ctx,
                  "auth-jwt.refreshToken",
                  response.data.refreshToken,
                  {
                    maxAge: 60 * 60 * 24 * 30, // 30 dias
                    path: "/",
                  }
                );

                api.defaults.headers["Authorization"] = `Bearer ${token}`;

                failedRequestsQueue.forEach((request) =>
                  request.resolve(token)
                );
                failedRequestsQueue = [];
              })
              .catch((err) => {
                failedRequestsQueue.forEach((request) => request.eject(err));
                failedRequestsQueue = [];

                if (process.browser) {
                  destroyCookie(ctx, "auth-jwt.token");
                  destroyCookie(ctx, "auth-jwt.refreshToken");

                  Router.push("/");
                }
              })
              .finally(() => (isRefreshing = false));
          }

          return new Promise((resolve, reject) => {
            failedRequestsQueue.push({
              resolve: (token: string) => {
                originalConfig.headers["Authorization"] = `Bearer ${token}`;

                resolve(api(originalConfig));
              },
              eject: (err: AxiosError) => {
                reject(err);
              },
            });
          });
        } else {
          if (process.browser) {
            destroyCookie(ctx, "auth-jwt.token");
            destroyCookie(ctx, "auth-jwt.refreshToken");

            Router.push("/");
          }
        }
      }
      return Promise.reject(error);
    }
  );

  return api;
};
