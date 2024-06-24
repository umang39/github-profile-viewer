import React, { ReactElement, useEffect, useState } from "react";
import { Box, Button, Grid } from "@mui/material";
import { useSuggestionStyle } from "@pages/index";
import { CircularProgress, Link, Typography } from "@material-ui/core";
import { followUserApiCall, fetchSuggestedUsersApiCall } from "@services/index";
import {
  API_URLS,
  NO_OF_SUGGESITON,
  METHOD_TYPE,
  STATUS_CODE,
  SNACKBAR_TYPE,
} from "@constants/index";
import { followUserInterface } from "@interface/FollowUserInterface";
import { useSnackBar } from "@hooks/index";
import { fetchData } from "@store/Action/FetchDataAction";
import { ROUTES_PATH } from "@constants/index";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import makeisFollowApi from "@services/makeApiCall/makeIsFollowApi";
import { Method } from "axios";
import { Base64 } from "js-base64";

const Suggestion = (): ReactElement => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const suggestionStyle = useSuggestionStyle();
  const { GET, PUT } = METHOD_TYPE;
  const { ERROR, SUCCESS } = SNACKBAR_TYPE;
  const [users, setUsers] = useState<followUserInterface[]>([]);
  const [responseUsers, setResponseUsers] = useState<followUserInterface[]>([]);
  const { SnackBarComponent, setAlertType, openSnackBar } = useSnackBar();
  const [loader, setLoader] = useState<boolean>(false);
  const makefetchSuggestedUsersApiCall = () => {
    setLoader(true);
    fetchSuggestedUsersApiCall(
      GET as Method,
      API_URLS.SEARCH,
      Math.random() * 100,
      Math.random() * 100
    ).then((res) => {
      const tempArray = [];
      const start =
        Math.floor(Math.random() * 100) % (res.data.items.length - 3);
      for (let i = start; i < start + NO_OF_SUGGESITON; i++) {
        const tempResObj = {
          login: res.data.items[i].login,
          id: res.data.items[i].id,
          html_url: res.data.items[i].html_url,
          avatar_url: res.data.items[i].avatar_url,
        };
        tempArray.push(tempResObj);
      }
      setResponseUsers(res.data.items);
      setUsers(tempArray);
      setLoader(false);
    });
  };
  useEffect(() => {
    makefetchSuggestedUsersApiCall();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const followUser = (event: React.SyntheticEvent): void => {
    makeisFollowApi(
      GET as Method,
      API_URLS.LOGIN,
      (event.target as HTMLInputElement).id
    )
      .then((res) => {
        setAlertType(ERROR as "error");
        openSnackBar("You Already Following this user");
      })
      .catch((e) => {
        followUserApiCall(
          PUT as Method,
          process.env.React_App_BASE_URL as string,
          (event.target as HTMLInputElement).id
        ).then((res) => {
          try {
            const { status } = res;
            if (status === STATUS_CODE.FOLLOW_SUCCESS) {
              let tempArray = responseUsers.filter((value) => {
                return value.login !== (event.target as HTMLInputElement).id;
              });
              setResponseUsers(tempArray);
              if (tempArray.length < NO_OF_SUGGESITON) {
                makefetchSuggestedUsersApiCall();
                tempArray = responseUsers;
              }
              const upDateUsersArray = [];
              const start =
                Math.floor(Math.random() * 100) % (tempArray.length - 2);

              for (let i = start; i < start + NO_OF_SUGGESITON; i++) {
                upDateUsersArray.push(tempArray[i]);
              }
              setAlertType(SUCCESS as "success");
              openSnackBar("Follow Successfully");
              setUsers(upDateUsersArray);
            } else {
              setAlertType(ERROR as "error");
              openSnackBar("Already Following");
            }
          } catch (e) {
            setAlertType(ERROR as "error");
            openSnackBar("something went wrong while Following");
          }
        });
      });
  };
  const deleteUser = (event: React.SyntheticEvent): void => {
    let tempArray = responseUsers.filter((value) => {
      return value.id !== parseInt((event.target as HTMLInputElement).id);
    });
    setResponseUsers(tempArray);
    if (tempArray.length < NO_OF_SUGGESITON) {
      makefetchSuggestedUsersApiCall();
      tempArray = responseUsers;
    }
    const tempUserArray = [];
    const start = Math.floor(Math.random() * 100) % (tempArray.length - 2);
    for (let i = start; i < start + NO_OF_SUGGESITON; i++) {
      tempUserArray.push(tempArray[i]);
    }
    setUsers(tempUserArray);
  };
  return (
    <>
      <Box className={suggestionStyle.wrapper}>
        <Typography variant="h3">Who to Follow</Typography>
        {loader ? (
          <CircularProgress className={suggestionStyle.loader} />
        ) : (
          <Grid container justifyContent="center" marginTop={10}>
            {users.map((value) => {
              return (
                <Grid
                  item
                  key={value.id}
                  maxWidth={300}
                  boxShadow={6}
                  className={suggestionStyle.items}
                  margin={2}
                >
                  <Grid container justifyContent="center">
                    <Grid item xs={12} textAlign="right">
                      <button
                        onClick={deleteUser}
                        id={value.id.toString()}
                        className={suggestionStyle.crossBtn}
                      >
                        X
                      </button>
                    </Grid>

                    <Link className={suggestionStyle.link} href={value.login}>
                      <Grid item xs={12} textAlign="center">
                        <img
                          src={value.avatar_url}
                          alt="logo"
                          className={suggestionStyle.avatar}
                        />
                      </Grid>
                    </Link>
                    <Grid item xs={12} textAlign="center">
                      <Typography
                        variant="h4"
                        className={(suggestionStyle.login, "line-break")}
                      >
                        <Link
                          className={suggestionStyle.link}
                          href={value.login}
                        >
                          {value.login}
                        </Link>
                      </Typography>
                    </Grid>
                    <Grid>
                      <Button
                        onClick={followUser}
                        className={suggestionStyle.btn}
                        id={value.login}
                      >
                        follow
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Box>
      <SnackBarComponent />
    </>
  );
};

export default Suggestion;
