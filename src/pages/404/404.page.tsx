import { Box, Grid, Typography } from "@mui/material";
import React, { ReactElement } from "react";
import { useNotFoundStyle } from "@pages/404/index";
import GitHubIcon from "@mui/icons-material/GitHub";

const NotFound = (): ReactElement => {
  const notFoundStyle = useNotFoundStyle();
  return (
    <>
      <Grid
        justifyContent="center"
        alignItems="center"
        height={window.innerHeight}
        width="100%"
        container
      >
        <Box>
          <Grid xs={12}>
            <Typography textAlign="center" variant="h2">
              <span className={notFoundStyle.header}>
                4<GitHubIcon />4
              </span>
            </Typography>
          </Grid>
          <Grid xs={12}>
            <Typography textAlign="center" variant="h4">
              <span className={notFoundStyle.subHeader}> Page Not Found</span>
            </Typography>
          </Grid>
        </Box>
      </Grid>
    </>
  );
};

export default NotFound;
