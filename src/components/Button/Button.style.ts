import { makeStyles } from "@material-ui/core";
import { grey } from "@mui/material/colors";
import { theme } from "@src/theme";

const useStyle = makeStyles({
  btn: {
    borderRadius: 50,
    padding: `${theme.spacing(1)} ${theme.spacing(4)}`,
    fontWeight: "bold",
    color: theme.palette.secondary.main,
    background: theme.palette.primary.main,
    "&:hover": {
      background: grey[800],
    },
  },
});

export default useStyle;
