import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <h1>Hello world</h1>
      <p>{user?.email}</p>
    </>
  );
};

export default Dashboard;
