import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650,
  },
  title: {
    margin: '30px',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    width: '100%',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
    fontSize: '0.875rem',
    fontWeight: '500',
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      width: '250px',
    },
  },
  total: {
    padding: '8px',
    fontSize: '0.875rem',
    fontWeight: '500',
    border: '2px solid black',
    display: 'inline',
  },
  dashboardContainer: {
    display: 'flex',
    height: 'calc(100% - 64px)',
  },
  totalContainer: {
    display: 'flex',
    marginTop: '20px',
    width: '100%',
    marginBottom: '20px',
    marginLeft: '20px',
  },
  sidebarPaper: {
    paddingTop: '30px',
  },
  graphContainer: {
    backgroundColor: 'white',
    boxShadow: '0px 2px 5px 0px rgba(0,0,0,0.4)',
    maxHeight: '60vh !important',
    borderRadius: '8px',
    paddingBottom: '66px',
    width: '100%',
    marginBottom: '40px',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      height: '50vh !important',
      maxHeight: '60vh !important',
    },
  },
}));
