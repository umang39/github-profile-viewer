import { makeStyles } from "@material-ui/core";
import { blue, grey } from "@mui/material/colors";
import { theme } from "../../theme";
const useSuggestionStyle = makeStyles({
  wrapper: {
    marginTop: theme.spacing(10),
    textAlign: "center",
    "& .css-18kf8z0-MuiGrid-root": {
      [theme.breakpoints.down("md")]: {
        marginBottom: `${theme.spacing(1)}`,
      },
    },
  },
  head: {
    textAlign: "center",
  },
  loader: {
    marginTop: theme.spacing(15),
  },
  login: {
    fontWeight: "bolder",
    minHeight: theme.spacing(20),
  },
  link: {
    fontWeight: "bolder",
    fontSize: theme.spacing(2),
    lineHeight: "normal",
    [theme.breakpoints.up("md")]: {
      fontSize: theme.spacing(3),
    },
  },
  items: {
    borderRadius: theme.spacing(1),
    padding: theme.spacing(2),
    position: "relative",
    minHeight: theme.spacing(25),
    marginTop: theme.spacing(1),
    width: `${theme.spacing(25)} `,
    [theme.breakpoints.up("sm")]: {
      width: `${theme.spacing(30)}`,
    },

    [theme.breakpoints.up("md")]: {
      width: `${theme.spacing(50)}`,
    },
    "& .MuiButtonBase-root": {
      fontSize: `${theme.spacing(1)}`,
      lineHeight: "normal",
      padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
      "&:hover": {
        background: `${theme.palette.primary.main} `,
        color: theme.palette.secondary.main,
        transition: ".3s all",
      },
    },
  },
  btn: {
    color: blue[200],
    fontWeight: "bolder",
  },
  crossBtn: {
    fontSize: `${theme.spacing(1.5)} `,
    lineHeight: "normal",
    fontFamily: theme.typography.fontFamily,
    border: "none",
    cursor: "pointer",
    padding: theme.spacing(0.6),
    height: theme.spacing(3),
    width: theme.spacing(3),
    borderRadius: "50%",
    background: "transparent",
    "&:hover": {
      borderRadius: "50%",
      background: grey[300],
    },
  },
  avatar: {
    height: theme.spacing(10),
    marginBottom: theme.spacing(1),
    borderRadius: "50%",
  },
});

export default useSuggestionStyle;
