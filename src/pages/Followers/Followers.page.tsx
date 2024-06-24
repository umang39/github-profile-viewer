import React, { ReactElement, useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { ErrorComponent } from "@components/index";
import { useFollowersStyle } from "@pages/index";
import { CircularProgress, Link } from "@material-ui/core";
import { followUserInterface } from "@interface/index";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { fetchData } from "@store/Action/FetchDataAction";
import { METHOD_TYPE, ROUTES_PATH } from "@constants/index";
import GitHubIcon from "@mui/icons-material/GitHub";
import fetchFollowersApi from "@services/makeApiCall/makeFetchFollowers";
import { Method } from "axios";
import { theme } from "@src/theme";
import { Base64 } from "js-base64";

const Followers = (): ReactElement => {
  const [following, setFollowing] = useState<followUserInterface[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const followersStyles = useFollowersStyle();
  const { GET } = METHOD_TYPE;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    setIsLoading(true);
    const username = localStorage.getItem("username");
    const token = localStorage.getItem("token");
    const password = Base64.decode(token as string);
    if (username && password) {
      const userData = {
        username,
        password,
      };
      dispatch(fetchData(userData));
    } else {
      navigate(ROUTES_PATH.LOGIN);
    }

    fetchFollowersApi(
      GET as Method,
      process.env.React_App_BASE_URL as string
    ).then((res) => {
      setFollowing(res.data);
      setIsLoading(false);
    });
    // .catch((e) => {
    //   if (e.response) {
    //     if (e.response.status === AUTH_DENIED) {
    //       setAlertType(ERROR as "error");
    //       openSnackBar("You are not Authorized");
    //     } else if (e.response.status === FORBIDDEN) {
    //       setAlertType(ERROR as "error");
    //       openSnackBar("Please After Some Time");
    //     } else {
    //       setAlertType(ERROR as "error");
    //       openSnackBar("Something Went Wrong");
    //     }
    //   } else {
    //     setAlertType(ERROR as "error");
    //     openSnackBar("Pease Check Your Internet Connection");
    //   }
    // });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Box>
          {!following.length ? (
            <ErrorComponent />
          ) : (
            <Grid container justifyContent="center" marginTop={10}>
              <Grid item md={10}>
                <Grid container justifyContent="center">
                  {following.map((value) => {
                    return (
                      <Link href={`/${value.login}`} key={value.id}>
                        <Grid
                          item
                          className={followersStyles.items}
                          boxShadow={10}
                          borderRadius={5}
                          margin={theme.spacing(3)}
                        >
                          <Grid container justifyContent="center">
                            <Grid
                              item
                              xs={12}
                              className={followersStyles.imgWrapper}
                            >
                              <img
                                src={value.avatar_url}
                                alt="avatar's_image"
                                className={followersStyles.img}
                              />
                            </Grid>
                            <Grid
                              item
                              xs={12}
                              className={followersStyles.usernameWrapper}
                            >
                              <Typography variant="h4" className="line-break">
                                <Link
                                  href={`/${value.login}`}
                                  className={followersStyles.login}
                                  id={value.login}
                                >
                                  {value.login}
                                </Link>
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Link href={value.html_url}>
                                <GitHubIcon
                                  id="follower-github"
                                  className={followersStyles.githubIcon}
                                  style={{
                                    fontSize: theme.spacing(3),
                                  }}
                                />
                              </Link>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Link>
                    );
                  })}
                </Grid>
              </Grid>
            </Grid>
          )}
        </Box>
      )}
    </>
  );
};

export default Followers;
