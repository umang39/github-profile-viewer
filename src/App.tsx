import React from "react";
import { ThemeProvider } from "@material-ui/core";
import { theme } from "./theme";
import { BrowserRouter as Router } from "react-router-dom";
import RouterRoutes from "./RouterRoutes";
import { NavBar } from "./components";
import axios from "axios";
import { SNACKBAR_TYPE, STATUS_CODE } from "@constants/index";
import { useSnackBar } from "@hooks/index";

const App: React.FC = () => {
  const { AUTH_DENIED, FORBIDDEN, BAD_REQ } = STATUS_CODE;
  const { ERROR } = SNACKBAR_TYPE;
  const { SnackBarComponent, setAlertType, openSnackBar } = useSnackBar();
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (e) => {
      if (e.response) {
        if (e.response.status === AUTH_DENIED) {
          setAlertType(ERROR as "error");
          openSnackBar("Enter Correct Username and Password");
        } else if (e.response.status === BAD_REQ) {
          setAlertType(ERROR as "error");
          openSnackBar("Bad Gateway");
        } else if (e.response.status === FORBIDDEN) {
          setAlertType(ERROR as "error");
          openSnackBar("Access to the requested resource is forbidden");
        } else {
          if (e.response.config.url.indexOf("user/following")) {
            return Promise.reject(e);
          }
          setAlertType(ERROR as "error");
          openSnackBar("Something Went Wrong");
        }
      } else {
        setAlertType(ERROR as "error");
        openSnackBar("Pease Check Your Internet Connection");
      }
      return Promise.reject(e);
    }
  );
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <SnackBarComponent />
        <NavBar />
        <RouterRoutes />
      </Router>
    </ThemeProvider>
  );
};

export default App;
