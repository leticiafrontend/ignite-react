import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useCan } from "../hooks/useCan";
import { setupAPIClient } from "../services/api";
import { api } from "../services/apiClient";
import { withSSRAuth } from "../utils/withSSRAuth";

const Dashboard: NextPage = () => {
  const { user } = useContext(AuthContext);
  const userCanSeeMetrics = useCan({ permissions: ["metrics.list"] });
  useEffect(() => {
    api
      .get("/me")
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <h1>Hello world</h1>
      <p>{user?.email}</p>
      {userCanSeeMetrics && <p>Olá</p>}
    </>
  );
};

export default Dashboard;

export const getServerSideProps: GetServerSideProps = withSSRAuth(
  async (ctx) => {
    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get("/me");

    return { props: {} };
  }
);
