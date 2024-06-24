import React, { ReactElement } from "react";
import { Box } from "@mui/material";
import notFound from "@assets/images/noDataFound.png";
import { useErrorStyle } from "@components/index";

const ErrorComponent = (): ReactElement => {
  const errorStyle = useErrorStyle();
  return (
    <>
      <Box>
        <img src={notFound} alt="notFound" className={errorStyle.image} />
      </Box>
    </>
  );
};

export default ErrorComponent;
