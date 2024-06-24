import { makeStyles } from "@material-ui/core";
import { grey } from "@mui/material/colors";
import { theme } from "../../theme";
export const useSocialStyle = makeStyles({
  container: {
    background: `linear-gradient(120deg ,${grey[300]} 30%,${grey[100]})`,
    backgroundPosition: "right bottom",
    backgroundSize: "150% 150%",
    borderRadius: 20,
    padding: theme.spacing(1),
    color: theme.palette.primary.main,
    height: "max-content",
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(3),
    },
    [theme.breakpoints.down("md")]: {
      margin: theme.spacing(1),
    },
  },
  followBtn: {
    textAlign: "center",
    [theme.breakpoints.up("md")]: {
      textAlign: "left",
    },
  },
  follower: {
    textAlign: "left",
    borderBottom: `${theme.spacing(0.2)} solid transparent`,
    [theme.breakpoints.down("md")]: {
      textAlign: "center",
    },
    "&:hover": {
      cursor: "pointer",
      borderBottom: `${theme.spacing(0.2)} solid ${theme.palette.primary.main}`,
    },
  },
  follow: {
    textAlign: "center",
    [theme.breakpoints.up("md")]: {
      textAlign: "unset",
    },
  },
  followerContainer: {
    justifyContent: "center",
    [theme.breakpoints.up("md")]: {
      justifyContent: "unset",
    },
  },
  followContainer: {
    margin: "10rem 0",
    [theme.breakpoints.up("xs")]: {
      margin: "unset",
    },
  },
  avatarWrapper: {
    [theme.breakpoints.up("md")]: {
      display: "unset",
      justifyContent: "unset",
    },
    display: "flex",
    justifyContent: "center",
  },
  head: {
    color: "#616161",
    fontWeight: "bolder",
  },
  user: {
    marginTop: 10,
  },
  avatar: {
    height: 100,
    width: 100,
  },
});
