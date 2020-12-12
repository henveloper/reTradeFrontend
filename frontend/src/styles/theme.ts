import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';
import { blueGrey, grey } from '@material-ui/core/colors';

export const defaultTheme = responsiveFontSizes(
    createMuiTheme({
        palette: {
            primary: {
                main: blueGrey['800']
            },
            secondary: {
                main: grey['800']
            },
        }
    })
);
