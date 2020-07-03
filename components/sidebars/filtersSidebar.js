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
  Menu,
  MenuItem,
 
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { datediff } from '../overviewComponents/timeframeDisplay';
import { today, firstDay, twoWeeks, nextweek, previousWeek } from '../../components/data/defaultDates';

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

const options = [
  'greenwich',
  'kingston',
];

const ITEM_HEIGHT = 48;

export default function FiltersSidebar(props) {
  
  const { sidebar } = props;

  const [start, setStart] = useState(today);
  const [end, setEnd] = useState(nextweek);
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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

            <p style={{ marginLeft: '10px' }}>Results for {datediff(start, end)}</p>
            <Container style={{ marginTop: '10px', width: '100%'}}>
              
                <Button
                  aria-label="more"
                  aria-haspopup="true"
                  aria-controls="customized-menu"
                  variant="contained"
                  style={{ fontSize: '12px', margin: '0 5px 0 5px', width: "100%" }}
                  onClick={handleClick}
                >
                  Region <ArrowDropDownIcon />
                </Button>
                <Menu
                  id="long-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={openMenu}
                  onClose={handleClose}
                  PaperProps={{
                    style: {
                      maxHeight: ITEM_HEIGHT * 4.5,
                      width: '20ch',
                    },
                  }}
                >
                  {options.map((option) => (
                    <MenuItem key={option}  >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={eval(option)}
                            onChange={handleChange(option)}
                            value={option}
                          />
                        }
                        label={option}
                      />
                    </MenuItem>
                  ))}
                </Menu>
            </Container>
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
