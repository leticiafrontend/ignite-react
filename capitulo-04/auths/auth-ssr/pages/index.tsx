import type { NextPage } from "next";
import Head from "next/head";
import { FormEvent, useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import styles from "../styles/Home.module.css";
import { withSSRGuest } from "../utils/withSSRGuest";

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
        <title>Auth with SSR</title>
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

export const getServerSideProps = withSSRGuest(async (ctx) => {
  return { props: {} };
});
