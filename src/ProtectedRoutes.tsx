import React, { ReactElement } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = (): ReactElement => {
  return localStorage.getItem("token") ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
