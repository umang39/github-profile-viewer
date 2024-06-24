import React from "react";
import { loginInt } from "../../interface/LoginData";

export interface ButtonInterface {
  /**
   * Describing disbable of button
   */
  isDisabled?: boolean;
  /**
   * Describe Button Value
   */
  value?: string;
  data?: loginInt;
  id?: string;
  /** Describe Button Types */
  type?: "submit" | "button";
  btnHandler?: (event: React.SyntheticEvent) => void;
}
