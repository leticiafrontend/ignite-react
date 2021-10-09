import { useRouter } from "next/dist/client/router";
import { createContext, ReactNode, useEffect, useState } from "react";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { api } from "../services/apiClient";

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
  signIn(credentials: SignInCredentials): Promise<void>;
  isAuthenticated: boolean;
  user: User;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User>();
  const router = useRouter();
  const isAuthenticated = !!user;

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
          destroyCookie(undefined, "auth-jwt.token");
          destroyCookie(undefined, "auth-jwt.refreshToken");

          router.push("/");
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
    <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
};
