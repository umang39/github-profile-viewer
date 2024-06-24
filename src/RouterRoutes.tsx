import React from "react";
import { Route, Routes } from "react-router-dom";
import { NavBar } from "@components/index";
import { ROUTES_PATH } from "./constants";
import { Followers, Login, Suggestion, UserProfile } from "@pages/index";
import NotFound from "./pages/404/404.page";
import { Home } from "./pages/Home";
import ProtectedRoutes from "@src/ProtectedRoutes";
const RouterRoutes: React.FC = () => {
  const { LOGIN, HOME, SEARCHED_USER, SUGGESTION, FOLLOWERS } = ROUTES_PATH;

  return (
    <>
      <Routes>
        <Route path={LOGIN} element={<Login />} />
        <Route path="*" element={<NotFound />}></Route>
        <Route element={<ProtectedRoutes />}>
          <Route path={HOME} element={<Home />} />
          <Route path={SEARCHED_USER} element={<UserProfile />}></Route>
          <Route path={SUGGESTION} element={<Suggestion />}></Route>
          <Route path={FOLLOWERS} element={<Followers />}></Route>

          <Route
            path={`(${HOME}|${SEARCHED_USER} | ${SUGGESTION} | ${FOLLOWERS})`}
            element={<NavBar />}
          ></Route>
        </Route>
      </Routes>
    </>
  );
};

export default RouterRoutes;
