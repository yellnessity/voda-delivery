import { createMuiTheme } from '@material-ui/core'

export const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#C5F4FF"
        },
        secondary: {
            main: "#0494B4"
        }
    },
    typography: {
        fontFamily: 'Muller'
    },
    shape: {
        borderRadius: 20
    },
    overrides: {
        MuiInput: {
            underline: {
                color: '#0494B4',
                '&:before': {
                    borderBottom: '1px solid #0494B4'
                },
                '&:after': {
                    borderBottom: '2px solid #0494B4'
                },
                '&:hover:not($disabled):not($error):before': {
                    borderBottom: '1px solid #0494B4'
                }
            }
        },
        MuiInputBase: {
            disableRipple: 'true'
        },
        MuiButton: {
            root: {
                textTransform: 'none',
                padding: 15
            }
        }
    }
})