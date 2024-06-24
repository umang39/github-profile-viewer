import React, { useState } from "react";
import { Snackbar } from "@material-ui/core";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { snackBarInterface } from ".";

const useSnackBar = (): snackBarInterface => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("hello");
  const [type, setType] = useState<"error" | "info" | "success" | "warning">(
    "success"
  );

  function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const openSnackBar = (msg: string): void => {
    setMessage(msg);
    setIsActive(true);
  };
  const setAlertType = (
    alertType: "error" | "info" | "success" | "warning"
  ) => {
    setType(alertType);
  };
  const SnackBarComponent = () => {
    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
      if (reason === "clickaway") {
        return;
      }
      setIsActive(false);
    };
    return (
      <Snackbar open={isActive} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={type}>
          {message}
        </Alert>
      </Snackbar>
    );
  };
  return {
    SnackBarComponent,
    openSnackBar,
    isActive,
    message,
    type,
    setAlertType,
  };
};

export default useSnackBar;
