import { createTheme } from "@material-ui/core";
import { grey } from "@mui/material/colors";

const PRIMARY_MAIN = "#212121";
const SECONDARY_MAIN = "#f5f5f5";
const WHITE = "#ffffff";
const PRIMARY_LIGHT = grey[700];

export const theme = createTheme({
  palette: {
    primary: {
      main: PRIMARY_MAIN,
      light: PRIMARY_LIGHT,
    },
    secondary: {
      main: SECONDARY_MAIN,
    },
    text: {
      primary: PRIMARY_MAIN,
    },
  },
  spacing: (factor) => `${1 * factor}rem`,
  typography: {
    fontFamily: ["Roboto", "sans-serif"].join(","),
    fontSize: 20,
  },
  overrides: {
    MuiButton: {
      label: {
        color: WHITE,
      },
    },
  },
});
