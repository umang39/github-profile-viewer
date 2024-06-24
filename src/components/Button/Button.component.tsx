import React, { ReactElement } from "react";
import { Button } from "@material-ui/core";
import { useStyle, ButtonInterface } from "@components/index";

const ButtonComponent = (props: ButtonInterface): ReactElement => {
  const mainBtnClass = useStyle();
  const { btnHandler, value, isDisabled, id, type } = props;
  return (
    <Button
      variant="contained"
      className={mainBtnClass.btn}
      onClick={btnHandler}
      type={type}
      id={id}
      disabled={isDisabled}
    >
      {value}
    </Button>
  );
};

export default ButtonComponent;
