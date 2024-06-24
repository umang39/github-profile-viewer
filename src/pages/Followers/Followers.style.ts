import { makeStyles } from "@material-ui/core";
import { theme } from "../../theme";

const useFollowersStyle = makeStyles({
  items: {
    width: theme.spacing(30),
    [theme.breakpoints.down("xs")]: {
      width: theme.spacing(25),
    },
    textAlign: "center",
    overflow: "hidden",
    "& .css-1em9ut6-MuiGrid-root": {
      marginBottom: theme.spacing(2),
    },
  },
  imgWrapper: {
    height: theme.spacing(20),
    borderRadius: theme.spacing(0.5),
    overflow: "hidden",
  },
  login: {
    fontWeight: "bolder",
    [theme.breakpoints.up("md")]: {
      fontSize: theme.spacing(3),
    },
    fontSize: theme.spacing(2),
  },
  githubIcon: {
    margin: `${theme.spacing(0)} ${theme.spacing(0)} ${theme.spacing(1)}`,
    "&:hover": {
      cursor: "pointer",
    },
  },
  usernameWrapper: {
    padding: `${theme.spacing(0)} ${theme.spacing(1)}`,
  },
  img: {
    width: "100%",
    transition: "transform 0.5s",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
});

export default useFollowersStyle;
