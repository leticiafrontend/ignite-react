import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    api.get("/me").then((response) => console.log(response));
  }, []);

  return (
    <>
      <h1>Hello world</h1>
      <p>{user?.email}</p>
    </>
  );
};

export default Dashboard;
