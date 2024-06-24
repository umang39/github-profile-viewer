import { makeStyles } from "@material-ui/core";
import { grey } from "@mui/material/colors";
import { theme } from "../../theme";

const useNavbarStyle = makeStyles({
  appBar: {
    background: theme.palette.primary.main,
    display: "flex",
    "& .MuiTypography-root": {
      margin: `0 ${theme.spacing(1)}`,
    },
  },
  link: {
    color: theme.palette.secondary.main,
    fontSize: theme.spacing(1.5),
    lineHeight: "normal",
    textDecoration: "none",
    [theme.breakpoints.down("md")]: {
      color: theme.palette.primary.main,
    },
    "&:hover": {
      borderBottom: `${theme.spacing(0.1)} solid ${
        theme.palette.secondary.main
      }`,
    },
  },
  btn: {
    color: `${theme.palette.primary.main} `,
    "&:hover": {
      cursor: "pointer",
    },
    background: "transparent",
    fontSize: `${theme.spacing(1.5)}`,
    lineHeight: "normal",
  },
  listItems: {
    [theme.breakpoints.up("md")]: {
      float: "right",
    },
  },

  search: {
    borderRadius: theme.spacing(0.5),
    width: `${theme.spacing(20)}`,
    [theme.breakpoints.down("md")]: {
      position: "absolute",
      right: theme.spacing(1),
      marginRight: theme.spacing(5),
    },
  },
  searchContainer: {
    position: "absolute",
    right: 0,
    width: theme.spacing(30),
  },
  logout: {
    marginRight: theme.spacing(2),
    "&:hover": {
      cursor: "pointer",
    },
  },
  searchInput: {
    width: "100%",
    fontSize: theme.spacing(1.5),
    lineHeight: "normal",
    borderRadius: theme.spacing(0.5),
    fontFamily: theme.typography.fontFamily,
    padding: `${theme.spacing(1)} ${theme.spacing(1.5)}`,
    background: grey[800],
    border: "none",
    color: "white",
    outline: "none",
    "&:focus": {
      borderBottom: `${theme.spacing(0.2)} solid ${grey[900]}`,
    },
  },
});

export default useNavbarStyle;
