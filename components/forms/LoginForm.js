import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import useForm from 'react-hook-form';
import { useDispatch } from 'react-redux';
import Router from 'next/router';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { setSession } from '../../store/ducks/session';

const useStyles = makeStyles(theme => ({
  paper: {
    margin: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(9, 4),
    },
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

const mutation = gql`
  mutation($email: String!, $password: String!) {
    createUserSession(email: $email, password: $password) {
      id
      user {
        email
        id
      }
    }
  }
`;

const LoginForm = ({ onChangeToSignUp: pushChangeToSignUp }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    formState: { isSubmitting },
    handleSubmit,
    register,
  } = useForm();
  const [createUserSession] = useMutation(mutation);

  const onSubmit = handleSubmit(async ({ email, password }) => {
    const {
      data: { createUserSession: createdSession },
    } = await createUserSession({ variables: { email, password } });
    dispatch(setSession(createdSession));
    Router.push('/dashboard');
  });

  return (
    <div className={classes.paper}>
      <img
        src="Vida_Logo.png"
        alt="logo"
        style={{ marginBottom: '20px', width: '50%', maxWidth: '200px' }}
      />
      <Typography component="h1" variant="h5">
        Login
      </Typography>
      <form className={classes.form} noValidate onSubmit={onSubmit}>
        <TextField
          disabled={isSubmitting}
          name="email"
          type="email"
          inputRef={register}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          autoComplete="email"
          autoFocus
        />
        <TextField
          disabled={isSubmitting}
          name="password"
          type="password"
          inputRef={register}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="password"
          label="Password"
          autoComplete="password"
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Login
        </Button>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <Link href="/reset-password" variant="body2" className="link">
              Forgot password?
            </Link>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Link href="/signup" variant="body2" className="link">
              Don't have an account? Sign Up
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default LoginForm;
