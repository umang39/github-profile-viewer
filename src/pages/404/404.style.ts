import { makeStyles } from "@material-ui/core";
import { theme } from "@src/theme";

const useNotFoundStyle = makeStyles({
  header: {
    fontWeight: "bolder",
    fontSize: theme.spacing(10),
    "& .MuiSvgIcon-fontSizeMedium": {
      fontSize: theme.spacing(7),
    },
    color: theme.palette.primary.light,
    [theme.breakpoints.up("md")]: {
      fontSize: theme.spacing(20),
      "& .MuiSvgIcon-fontSizeMedium": {
        fontSize: theme.spacing(13),
      },
    },
  },

  subHeader: {
    fontSize: theme.spacing(2),
    color: theme.palette.primary.light,
    [theme.breakpoints.up("md")]: {
      fontSize: theme.spacing(5),
    },
  },
});

export default useNotFoundStyle;
