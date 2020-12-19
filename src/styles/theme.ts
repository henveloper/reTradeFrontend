import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';
import { colors } from '@material-ui/core/';

export const defaultTheme = responsiveFontSizes(
    createMuiTheme({
        palette: {
            primary: {
                main: colors.grey['800']
            },
            secondary: {
                main: colors.blueGrey['800']
            },
        }
    })
);
