import React, { ReactElement, useEffect, useState } from "react";
import {
  Box,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import GitHub from "@assets/images/github.png";
import { useLoginStyle } from "@pages/index";
import { ButtonComponent } from "@components/index";
import { fetchData } from "@store/Action/FetchDataAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { State } from "@store/Reducers";
import { useSnackBar } from "@hooks/index";
import { ROUTES_PATH, STATUS_CODE, SNACKBAR_TYPE } from "@constants/index";

const Login: React.FC = (): ReactElement => {
  const loginClass = useLoginStyle();
  const { SnackBarComponent, setAlertType, openSnackBar } = useSnackBar();
  const [username, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { SUCCESS, ERROR } = SNACKBAR_TYPE;

  const [isUsernameDisabled, setIsUsernameDisabled] = useState<boolean>(true);
  const [isPasswordDisabled, setIsPasswordDisabled] = useState<boolean>(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data } = useSelector((state: State) => state.fetchdataReducer);

  const changePassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
    if (e.target.value.length > 0) {
      setIsPasswordDisabled(false);
    } else {
      setIsPasswordDisabled(true);
    }
  };

  const changeUsername = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUserName(e.target.value);
    if (e.target.value.length > 0) {
      setIsUsernameDisabled(false);
    } else {
      setIsUsernameDisabled(true);
    }
  };

  const btnHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const data = {
      username,
      password,
    };

    await dispatch(fetchData(data));
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate(ROUTES_PATH.HOME);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const { status } = data;
    if (status === STATUS_CODE.SUCCESS) {
      setAlertType(SUCCESS as "success");
      openSnackBar("Login Successfully");
      navigate(ROUTES_PATH.HOME);
    } else if (status === "error") {
      setAlertType(ERROR as "error");
      openSnackBar("Enter Correct Username and Password");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  return (
    <>
      <Grid container justifyContent="center">
        <Grid item md={8} sm={12} color="primary">
          <Box
            boxShadow={6}
            borderRadius={9}
            className={loginClass.loginWrapper}
          >
            <Grid container>
              <Grid item md={6} xs={12}>
                <Box
                  bgcolor="primary.main"
                  width="100%"
                  height="100%"
                  color="secondary.main"
                  textAlign="center"
                  className={loginClass.firstBox}
                >
                  <Grid
                    container
                    alignItems="center"
                    justifyContent="center"
                    className={loginClass.darkSection}
                  >
                    <Box>
                      <img src={GitHub} alt="gitimage" height="200" />
                      <Typography variant="h2">GitHub</Typography>
                      <Typography
                        variant="h6"
                        className={loginClass.profileText}
                      >
                        Profile Viewer
                      </Typography>
                    </Box>
                  </Grid>
                </Box>
              </Grid>
              <Grid item md={6} xs={12}>
                <Box p={5} height={500}>
                  <Typography variant="h3" className={loginClass.signIn}>
                    Sign In
                  </Typography>

                  <FormControl fullWidth onSubmit={btnHandler}>
                    <TextField
                      label="username"
                      variant="standard"
                      size="medium"
                      fullWidth
                      className={loginClass.input}
                      onChange={changeUsername}
                      id="username"
                    />
                    <TextField
                      label="access token"
                      type="password"
                      variant="standard"
                      size="medium"
                      fullWidth
                      className={loginClass.input}
                      onChange={changePassword}
                      id="token"
                    />
                    <Box marginTop={3}>
                      <ButtonComponent
                        type="button"
                        btnHandler={btnHandler}
                        value="Sign In"
                        data={{
                          username,
                          password,
                        }}
                        id="login-btn"
                        isDisabled={
                          !isUsernameDisabled && !isPasswordDisabled
                            ? false
                            : true
                        }
                      />
                    </Box>
                  </FormControl>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <SnackBarComponent />
    </>
  );
};

export default Login;
