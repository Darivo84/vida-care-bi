import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const Copyright = ({ open }) => (
  <Typography
    variant="body2"
    color="textSecondary"
    align="center"
    style={open ? { display: 'block' } : { display: 'none' }}
  >
    {'Copyright © '}
    <Link color="inherit" href="https://vida.co.uk/">
      Vida.
    </Link>{' '}
    <br />
    All Rights Reserved. {new Date().getFullYear()}
    {'.'}
  </Typography>
);

export default Copyright;
