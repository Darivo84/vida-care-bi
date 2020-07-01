import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Copyright from '../common/Copyright';
import { makeStyles } from '@material-ui/core/styles';

const randomImage = () => {
  const images = [
    'LoginImage1.jpg',
    'LoginImage2.jpg',
    'LoginImage3.jpg',
    'LoginImage4.jpg'
  ]
  const randomNumber = Math.floor(Math.random() * images.length)
  console.log(randomNumber)
  return images[randomNumber]
};
const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${randomImage()})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.grey[900]
        : theme.palette.grey[50],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const AuthSideBarLayout = (props) => {
  const classes = useStyles();
  const { children } = props;
  return (
    <Grid container component="main" className={classes.root} mt={5} style={{ position: "relative" }} >
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square style={{ position: "relative" }}>
        {children}
        <Box style={{position: "absolute", bottom: "20px", left: "37%"}} mt={5}>
          <Copyright />
        </Box>
      </Grid>
    </Grid>
  );
}

AuthSideBarLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthSideBarLayout;
