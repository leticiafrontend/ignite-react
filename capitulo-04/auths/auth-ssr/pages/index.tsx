import type { GetServerSideProps, NextPage } from "next";
import { parseCookies } from "nookies";
import Head from "next/head";
import { FormEvent, useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn } = useContext(AuthContext);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    await signIn(data);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Auth with JWT</title>
        <meta name="description" content="Auth with SSR" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = parseCookies(ctx);

  if (cookies["auth-jwt.token"]) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  return { props: {} };
};
