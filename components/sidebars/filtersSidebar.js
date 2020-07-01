import React, { useState } from 'react';
import useForm from 'react-hook-form';
import clsx from 'clsx';

import {
  TextField,
  Container,
  Button,
  FormControlLabel,
  Checkbox,
  Paper,
  FormGroup,
  FormLabel,
  FormControl,
  Drawer,
  AppBar,
  Toolbar,
  CssBaseline,
  IconButton,
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { datediff } from '../overviewComponents/timeframeDisplay';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  container: {
    display: 'inline',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: '10px',
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
    overflowX: 'hidden',
    width: 0,
    [theme.breakpoints.up('sm')]: {
      width: '240px',
    },
    
  },
  sidebarPaper: {
    paddingTop: '63px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    opacity: '0.5',
    '&:hover': {
      opacity: '1',
    },
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerPaperClosed: {
    width: '60px',
    marginTop: '8px'
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
}));

export default function FiltersSidebar(props) {
  // default dates
  const { sidebar } = props;
  const today = new Date().toJSON().slice(0, 10);
  const firstDay = new Date();
  const lastDay = new Date(
    firstDay.getFullYear(),
    firstDay.getMonth(),
    firstDay.getDate() + 7
  );
  const nextweek = lastDay.toJSON().slice(0, 10);
  //

  const [start, setStart] = useState(today);
  const [end, setEnd] = useState(nextweek);
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const classes = useStyles();
  const theme = useTheme();
  const [state, setState] = React.useState({
    liveInCare: true,
    dailyCare: false,
    nightCare: false,
    emergencyRatingLow: true,
    emergencyRatingMedium: false,
    emergencyRatingHigh: false,
    greenwich: true,
    kingston: false,
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  const {
    liveInCare,
    dailyCare,
    nightCare,
    emergencyRatingLow,
    emergencyRatingMedium,
    emergencyRatingHigh,
    greenwich,
    kingston,
  } = state;

  const resetFilters = () => {
    console.log('reset');
    setState({
      liveInCare: true,
      dailyCare: false,
      nightCare: false,
      emergencyRatingLow: true,
      emergencyRatingMedium: false,
      emergencyRatingHigh: false,
      kingston: false,
    });
  };
  const { register, getValues } = useForm();
  const handleSubmit = e => {
    e.preventDefault();

    const dates = { ...getValues() };
    if (dates.start !== start || dates.end !== end) {
      setStart(dates.start);
      setEnd(dates.end);
      console.log('submitted');
    }
  };

  return (
    <div
      className={!open ? classes.drawerPaperClosed : classes.root}
      style={
        sidebar ? { display: '' } : { display: 'none', position: 'relative' }
      }
    >
      <IconButton
        style={{ position: 'absolute', zIndex: '99999', width: '50px' }}
        aria-label="open drawer"
        edge="end"
        onClick={handleDrawerOpen}
        className={clsx(open && classes.hide)}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Paper className={classes.sidebarPaper}>
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              id="start"
              label="from"
              type="date"
              name="start"
              inputRef={register}
              defaultValue={start}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              size="small"
            />
            <TextField
              id="end"
              label="to"
              type="date"
              name="end"
              defaultValue={end}
              className={classes.textField}
              inputRef={register}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              size="small"
            />

            <p>Results for {datediff(start, end)}</p>
            <Container style={{ margin: '30px 0 10px 0' }}>
              <FormControl
                component="fieldset"
                className={classes.formControl}
                style={{ width: '100%' }}
              >
                <FormLabel component="legend">Care Type</FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={liveInCare}
                        onChange={handleChange('liveInCare')}
                        value="liveInCare"
                      />
                    }
                    label="Live-in Care"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={dailyCare}
                        onChange={handleChange('dailyCare')}
                        value="dailyCare"
                      />
                    }
                    label="Daily Care"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={nightCare}
                        onChange={handleChange('nightCare')}
                        value="nightCare"
                      />
                    }
                    label="Night Care"
                  />
                </FormGroup>
              </FormControl>
            </Container>

            <Container style={{ margin: '30px 0 10px 0' }}>
              <FormControl
                component="fieldset"
                className={classes.formControl}
                style={{ width: '100%' }}
              >
                <FormLabel component="legend">Emergency rating</FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={emergencyRatingLow}
                        onChange={handleChange('emergencyRatingLow')}
                        value="emergencyRatingLow"
                      />
                    }
                    label="Low"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={emergencyRatingMedium}
                        onChange={handleChange('emergencyRatingMedium')}
                        value="emergencyRatingMedium"
                      />
                    }
                    label="Medium"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={emergencyRatingHigh}
                        onChange={handleChange('emergencyRatingHigh')}
                        value="emergencyRatingHigh"
                      />
                    }
                    label="High"
                  />
                </FormGroup>
              </FormControl>
            </Container>

            <Container style={{ marginTop: '30px' }}>
              <FormControl
                component="fieldset"
                className={classes.formControl}
                style={{ width: '100%' }}
              >
                <FormLabel component="legend">Region</FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={greenwich}
                        onChange={handleChange('greenwich')}
                        value="greenwich"
                      />
                    }
                    label="Greenwich"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={kingston}
                        onChange={handleChange('kingston')}
                        value="kingston"
                      />
                    }
                    label="Kingston"
                  />
                </FormGroup>
              </FormControl>
            </Container>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                marginTop: '25px',
              }}
            >
              <Button
                aria-controls="customized-menu"
                aria-haspopup="true"
                variant="contained"
                color="primary"
                style={{ fontSize: '12px', margin: '0 5px 0 5px' }}
                type="submit"
              >
                Apply Now
              </Button>
              <Button
                aria-controls="customized-menu"
                aria-haspopup="true"
                variant="contained"
                onClick={resetFilters}
                style={{ fontSize: '12px', margin: '0 5px 0 5px' }}
              >
                Reset
              </Button>
            </div>
          </form>
        </Paper>
      </Drawer>
    </div>
  );
}
