import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#f50057',
    },
    secondary: {
      main: '#ffc20d',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
  typography: {
    typography: {
      fontFamily: "'Open Sans', sans-serif",
    },
  },
});

export default theme;
