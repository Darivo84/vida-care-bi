import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import useForm from 'react-hook-form';
import Router from 'next/router';

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
    createUser(email: $email, password: $password) {
      id
    }
  }
`;



const SignUpForm = props => {
  const classes = useStyles();

  const {
    formState: { isSubmitting },
    handleSubmit,
    register,
  } = useForm();
  const [createUser] = useMutation(mutation);

  const onSubmit = handleSubmit(async ({ email, password }) => {
    const {
      data: { createUser: createdUser },
    } = await createUser({ variables: { email, password } });
    Router.push('/login');
  });

  return (
    <div className={classes.paper}>
      <img
        src="Vida_Logo.png"
        alt="logo"
        style={{ marginBottom: '20px', width: '50%', maxWidth: '200px' }}
      />
      <Typography component="h1" variant="h5">
        Sign Up
      </Typography>
      <form className={classes.form} noValidate onSubmit={onSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          inputRef={register}
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          inputRef={register}
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
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
          Sign Up
        </Button>
        <Grid container>
          <Grid item>
            <Link href="/login" variant="body2">
              Have an account? Login
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default SignUpForm;
