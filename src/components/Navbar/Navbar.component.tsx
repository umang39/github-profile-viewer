import React, { ReactElement, useEffect, useState } from "react";
import { AppBar, Autocomplete, Box, Toolbar, Typography } from "@mui/material";
import { useNavbarStyle, searchUserInterface } from "@components/index";
import { Link, useNavigate } from "react-router-dom";
import {
  Grid,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { theme } from "../../theme";
import { useDispatch } from "react-redux";
import { removeData } from "@store/Action/FetchDataAction";
import makeFetchUsersApiCall, {
  makeSearchedUsersApiCall,
} from "@services/makeApiCall/makefetchUsersApi";
import { API_URLS, ROUTES_PATH, METHOD_TYPE } from "@constants/index";
import { fetchUsers } from "@store/Action/UsersAction";
import LogoutIcon from "@mui/icons-material/Logout";
import { Method } from "axios";

const NavBar = (): ReactElement => {
  const [users, setUsers] = useState<searchUserInterface[]>([]);
  const [loader, setLoader] = useState(false);
  const { GET } = METHOD_TYPE;
  const { LOGIN } = ROUTES_PATH;
  const { SEARCH, FETCH_USERS } = API_URLS;
  const navigate = useNavigate();
  const navbarStyle = useNavbarStyle();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  let timeout: ReturnType<typeof setTimeout>;

  const searchUsers = (event: React.SyntheticEvent) => {
    if (!(event.target as HTMLInputElement).value) {
      return;
    }
    function apiCall() {
      makeFetchUsersApiCall(
        GET as Method,
        SEARCH,
        (event.target as HTMLInputElement).value
      )
        .then((res) => {
          setLoader(false);
          const tempUserArray: searchUserInterface[] = [];
          for (const items of res.data.items) {
            tempUserArray.push({
              login: items.login,
            });
          }
          setUsers(tempUserArray);
        })
        .catch((e) => {
          setLoader(false);
        });
    }
    setLoader(true);
    clearTimeout(timeout);
    timeout = setTimeout(apiCall, 1000);
  };

  const [localStorageStatus, setocalStorageStatus] = useState(
    localStorage.getItem("token")
  );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setocalStorageStatus(localStorage.getItem("token"));
  });
  const showUser = (
    event: React.SyntheticEvent,
    value: searchUserInterface | null
  ) => {
    let targetCurrentUser = "";
    if (!value) {
      return;
    } else {
      targetCurrentUser = value.login;
    }
    makeSearchedUsersApiCall(GET as Method, FETCH_USERS, targetCurrentUser)
      .then((res) => {
        const { status, data } = res;
        const {
          login,
          followers,
          following,
          avatar_url,
          blog,
          html_url,
          location,
          bio,
          name,
        } = data;
        const targetUser = {
          status,
          data: {
            login,
            followers,
            following,
            avatar_url,
            blog,
            html_url,
            bio,
            location,
            name,
          },
        };
        dispatch(fetchUsers(targetUser));
        navigate(`/${targetCurrentUser}`);
      })
      .catch((e) => {
        setLoader(false);
      });
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const sessionHandler = () => {
    dispatch(removeData());
    navigate(LOGIN);
    localStorage.clear();
  };
  return (
    <>
      {localStorageStatus && (
        <AppBar>
          <Toolbar className={navbarStyle.appBar}>
            {isMobile ? (
              <>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={handleMenu}
                >
                  <MenuIcon />
                </IconButton>
                <Autocomplete
                  id="combo-box-demo-mobile"
                  loading={loader}
                  options={users}
                  getOptionLabel={(option) => {
                    return option["login"];
                  }}
                  className={navbarStyle.search}
                  onChange={showUser}
                  renderInput={(params) => (
                    <Box ref={params.InputProps.ref}>
                      <input
                        type="text"
                        placeholder="Enter User Id"
                        {...params.inputProps}
                        className={navbarStyle.searchInput}
                        onKeyPress={searchUsers}
                      />
                    </Box>
                  )}
                />
                <Menu
                  id="menu-appbar-mobile"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>
                    <Link
                      to={ROUTES_PATH.HOME}
                      className={navbarStyle.link}
                      id="nav-username"
                    >
                      {localStorage.getItem("username")}
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Link
                      id="nav-suggestion"
                      to={ROUTES_PATH.SUGGESTION}
                      className={navbarStyle.link}
                    >
                      Suggestion
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Typography className={navbarStyle.listItems}>
                      <Box
                        onClick={sessionHandler}
                        className={navbarStyle.btn}
                        color="primary"
                        id="logout"
                      >
                        Logout
                      </Box>
                    </Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Typography className={navbarStyle.listItems}>
                  <Link
                    to={ROUTES_PATH.HOME}
                    id="nav-username"
                    className={navbarStyle.link}
                  >
                    {localStorage.getItem("username")}
                  </Link>
                </Typography>
                <Typography className={navbarStyle.listItems}>
                  <Link
                    to={ROUTES_PATH.SUGGESTION}
                    id="nav-suggestion"
                    className={navbarStyle.link}
                  >
                    Suggestion
                  </Link>
                </Typography>
                <Box className={navbarStyle.searchContainer}>
                  <Grid container alignItems="center">
                    <Grid item md={6}>
                      <Autocomplete
                        id="combo-box-demo"
                        loading={loader}
                        options={users}
                        getOptionLabel={(option) => option.login}
                        className={navbarStyle.search}
                        onChange={showUser}
                        color="secondary"
                        renderInput={(params) => (
                          <Box ref={params.InputProps.ref}>
                            <input
                              placeholder="Enter User Id"
                              type="text"
                              {...params.inputProps}
                              className={navbarStyle.searchInput}
                              onKeyPress={searchUsers}
                            />
                          </Box>
                        )}
                      />
                    </Grid>
                    <Grid item md={6}>
                      <Typography className={navbarStyle.listItems}>
                        <Box
                          onClick={sessionHandler}
                          paddingTop={0.5}
                          id="logout"
                        >
                          {localStorage.getItem("username") ? (
                            <LogoutIcon
                              className={navbarStyle.logout}
                              fontSize="large"
                            />
                          ) : (
                            "Logout"
                          )}
                        </Box>
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </>
            )}
          </Toolbar>
        </AppBar>
      )}
    </>
  );
};

export default NavBar;
