import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {main:"#5865f2"},
    secondary: {main: "#ed4245"},
    text: {
      primary: "#8e9297",
    },
  },
  typography: {
    fontFamily: ["Montserrat", "Whitney", "Roboto"],
  },
});

export default theme;
