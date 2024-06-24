import { makeStyles } from "@material-ui/core";
import { theme } from "../../theme";

const useHomeStyle = makeStyles({
  container: {
    background: theme.palette.primary.main,
  },
  card: {
    marginTop: theme.spacing(10),
  },
});
export default useHomeStyle;
