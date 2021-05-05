import { red } from "@material-ui/core/colors";
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

// Create a theme instance.
const theme = responsiveFontSizes(
    createMuiTheme({
        palette: {
            type: "dark",
            primary: {
                main: "#556cd6",
            },
            secondary: {
                main: "#000",
            },
            error: {
                main: red.A400,
            },
        },
    }),
);

export default theme;
