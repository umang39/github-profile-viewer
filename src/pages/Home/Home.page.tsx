import React, { ReactElement, useEffect } from "react";
import { CircularProgress } from "@material-ui/core";
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { SocialCard } from "@components/index";
import { fetchData } from "@store/Action/FetchDataAction";
import { State } from "@store/Reducers";
import { STATUS_CODE, ROUTES_PATH } from "@constants/index";
import { useNavigate } from "react-router";
import { useHomeStyle } from "@pages/index";
import { Base64 } from "js-base64";

const Home: React.FC = (): ReactElement => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useSelector((state: State) => {
    return state.fetchdataReducer;
  });

  const { status } = data;
  const homeStyle = useHomeStyle();
  const followersHandler = (e: React.SyntheticEvent, login: string) => {
    localStorage.setItem("currentUser", login);
    navigate(ROUTES_PATH.FOLLOWERS);
  };

  useEffect(() => {
    const username = localStorage.getItem("username");
    const token = localStorage.getItem("token");
    const password = Base64.decode(token as string);
    if (username && password) {
      const userData = {
        username,
        password,
      };
      dispatch(fetchData(userData));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Grid container justifyContent="center" className={homeStyle.card}>
        {status === STATUS_CODE.SUCCESS ? (
          <SocialCard user={data["data"]} followersHandler={followersHandler} />
        ) : (
          <CircularProgress />
        )}
      </Grid>
    </>
  );
};
export default Home;
