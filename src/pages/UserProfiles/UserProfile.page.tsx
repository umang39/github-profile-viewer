import React, { ReactElement, useCallback, useEffect, useState } from "react";
import { CircularProgress } from "@material-ui/core";
import { Box, Grid } from "@mui/material";
import { Method } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { SocialCard, ErrorComponent } from "@components/index";
import {
  NO_OF_SUGGESITON,
  METHOD_TYPE,
  STATUS_CODE,
  SNACKBAR_TYPE,
  API_URLS,
  ROUTES_PATH,
} from "@constants/index";
import { useSnackBar } from "@hooks/index";
import { followUserApiCall } from "@services/index";
import { fetchData } from "@store/Action/FetchDataAction";
import { fetchUsers } from "@store/Action/UsersAction";
import { State } from "@store/Reducers";
import { useUserProfile } from "@pages/index";
import { makeSearchedUsersApiCall } from "@services/makeApiCall/makefetchUsersApi";
import makeisFollowingApi from "@src/services/makeApiCall/makeIsFollowingApi";
import { Base64 } from "js-base64";

const UserProfile = (): ReactElement => {
  const userData = useSelector((state: State) => {
    return state.usersReducers;
  });
  const { GET } = METHOD_TYPE;
  const [isFollow, setIsFollow] = useState<boolean>(true);
  const [loader, setLoader] = useState<boolean>(true);
  const { PUT } = METHOD_TYPE;
  const { FETCH_USERS } = API_URLS;
  const { SUCCESS } = SNACKBAR_TYPE;
  const { FOLLOWING } = API_URLS;
  const { SnackBarComponent, setAlertType, openSnackBar } = useSnackBar();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tempStr = window.location.href;
  const arr = tempStr.split("/");
  const { data, status } = userData;
  const profileStyle = useUserProfile();
  const followingUser = useCallback(
    (user: string): void => {
      makeisFollowingApi(GET as Method, FOLLOWING, user)
        .then((isFollowing) => {
          const { status } = isFollowing;
          if (status === 204) {
            setIsFollow(true);
          }
        })
        .catch((e) => {
          setIsFollow(false);
        });
    },
    [FOLLOWING, GET]
  );

  useEffect(() => {
    if (data) {
      const { login } = data;
      followingUser(login);
    }
  }, [data, followingUser]);
  useEffect(() => {
    setLoader(true);
    const username = localStorage.getItem("username");
    const token = localStorage.getItem("token");
    const password = Base64.decode(token as string);
    if (username && password) {
      const userData = {
        username,
        password,
      };
      dispatch(fetchData(userData));
      makeSearchedUsersApiCall(
        GET as Method,
        FETCH_USERS,
        arr[NO_OF_SUGGESITON]
      )
        .then((res) => {
          const { status, data } = res;
          const {
            login,
            followers,
            bio,
            email,
            following,
            avatar_url,
            blog,
            html_url,
            location,
            name,
          } = data;
          const targetUser = {
            status,
            data: {
              login,
              followers,
              bio,
              email,
              following,
              avatar_url,
              blog,
              html_url,
              location,
              name,
            },
          };
          followingUser(login);
          setLoader(false);
          dispatch(fetchUsers(targetUser));
          navigate(`/${arr[NO_OF_SUGGESITON]}`);
        })
        .catch((e) => {
          setLoader(false);
        });
    } else {
      setLoader(false);
      navigate(ROUTES_PATH.LOGIN);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const followUser = (e: React.SyntheticEvent) => {
    followUserApiCall(
      PUT as Method,
      process.env.React_App_BASE_URL as string,
      (e.target as HTMLInputElement).id
    ).then((res) => {
      const { status } = res;
      if (status === STATUS_CODE.FOLLOW_SUCCESS) {
        setIsFollow(true);
        setAlertType(SUCCESS as "success");
        openSnackBar("Follow Successfully");
      }
    });
  };
  const followersHandler = (e: React.SyntheticEvent, login: string) => {
    localStorage.setItem("currentUser", login);
    navigate(ROUTES_PATH.FOLLOWERS);
  };
  return (
    <>
      {loader ? (
        <Grid container justifyContent="center">
          <CircularProgress className={profileStyle.loader} />
        </Grid>
      ) : (
        <Box>
          {status === STATUS_CODE.SUCCESS ? (
            <Grid
              container
              justifyContent="center"
              className={profileStyle.card}
            >
              <SocialCard
                user={data}
                followHandler={followUser}
                followersHandler={followersHandler}
                isFollowingUser={followingUser}
                isFollow={isFollow}
              />
            </Grid>
          ) : (
            <ErrorComponent />
          )}
        </Box>
      )}

      <SnackBarComponent />
    </>
  );
};
export default UserProfile;
