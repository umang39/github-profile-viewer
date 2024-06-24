import { makeStyles } from "@material-ui/styles";
import { theme } from "../../theme";
export const useLoginStyle = makeStyles({
  input: {
    marginTop: 20,
    [theme.breakpoints.up("md")]: {
      marginTop: 20,
    },
  },
  profileText: {
    fontWeight: "bold",
  },
  signIn: {
    [theme.breakpoints.down("md")]: {
      textDecoration: "underLine",
      textDecorationThickness: 4,
    },
  },
  darkSection: {
    height: "100%",
  },
  loginWrapper: {
    height: "100%",
    marginTop: 0,
    [theme.breakpoints.up("md")]: {
      height: 500,
      marginTop: 50,
    },
  },
  firstBox: {
    height: 400,
    borderRadius: `0 0 ${theme.spacing(0.9)} ${theme.spacing(0.9)} `,
    [theme.breakpoints.up("md")]: {
      height: "100%",
      borderRadius: theme.spacing(0.9),
    },
  },
});
