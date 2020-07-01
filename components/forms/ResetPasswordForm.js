import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const ResetPasswordForm = props => {
  const classes = useStyles();

  return (
    <div className={classes.paper}>
      <img src='Vida_Logo.png' style={{ marginBottom: "20px" }} />
      <Typography component="h1" variant="h5">
        Forgot your password?
      </Typography>
      <Typography style={{ marginTop: "20px" }} component="p" >
        Enter your @vida.co.uk email and we will send you link to reset your password
      </Typography>
      <form className={classes.form} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Reset Password
        </Button>
        <Grid container>
          <Grid item>
            <Link href="/login" variant="body2">
              Login
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
