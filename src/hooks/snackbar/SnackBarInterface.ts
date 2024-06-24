import { ReactElement } from "react";

export interface snackBarInterface {
  openSnackBar: (msg: string) => void;
  isActive: boolean;
  message: string;
  type: "error" | "info" | "success" | "warning";
  SnackBarComponent: () => ReactElement;
  setAlertType: (msg: "error" | "info" | "success" | "warning") => void;
}
