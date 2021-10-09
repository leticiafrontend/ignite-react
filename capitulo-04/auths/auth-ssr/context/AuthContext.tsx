import { useRouter } from "next/dist/client/router";
import { createContext, ReactNode, useEffect, useState } from "react";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { api } from "../services/apiClient";
import Router from "next/router";

type User = {
  email: string;
  permissions: string[];
  roles: string[];
};

type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => void;
  isAuthenticated: boolean;
  user: User;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

let authChannel: BroadcastChannel;

export const signOut = () => {
  destroyCookie(undefined, "auth-jwt.token");
  destroyCookie(undefined, "auth-jwt.refreshToken");

  authChannel.postMessage("signOut");

  Router.push("/");
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User>();
  const router = useRouter();
  const isAuthenticated = !!user;

  useEffect(() => {
    authChannel = new BroadcastChannel("auth");

    authChannel.onmessage = (message) => {
      switch (message.data) {
        case "signOut":
          signOut();
          break;
        default:
          break;
      }
    };
  }, []);

  useEffect(() => {
    const { "auth-jwt.token": token } = parseCookies();

    if (token) {
      api
        .get("/me")
        .then((response) => {
          const { email, permissions, roles } = response.data;
          setUser({ email, permissions, roles });
        })
        .catch(() => {
          signOut();
        });
    }
  }, []);

  const signIn = async ({ email, password }: SignInCredentials) => {
    try {
      const response = await api.post("sessions", {
        email,
        password,
      });

      const { permissions, roles, token, refreshToken } = response.data;

      setCookie(undefined, "auth-jwt.token", token, {
        maxAge: 60 * 60 * 24 * 30, // 30 dias
        path: "/",
      });
      setCookie(undefined, "auth-jwt.refreshToken", refreshToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 dias
        path: "/",
      });

      setUser({ email, permissions, roles });

      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      router.push("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider value={{ signOut, signIn, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
};
