import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
} from '@material-ui/core';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import TimelineIcon from '@material-ui/icons/Timeline';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import PollIcon from '@material-ui/icons/Poll';
import TableChartIcon from '@material-ui/icons/TableChart';
import MenuIcon from '@material-ui/icons/Menu';
import NoteIcon from '@material-ui/icons/Note';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import FiltersSidebar from '../sidebars/filtersSidebar';
import Copyright from '../common/Copyright';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  title: {
    flexGrow: 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: 0,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  appBarSpacer: theme.mixins.toolbar,

  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },

  fixedHeight: {
    height: 240,
  },
  inline: {
    color: '#f50057 !important',
  },
  list: {
    opacity: '0.6',
    '&:hover': {
      opacity: '1',
    },
  },
  hide: {
    display: 'none',
  },
  icon: {
    paddingLeft: '9px',
  },
}));

const DashboardLayout = props => {
  const classes = useStyles();
  const theme = useTheme();

  const [open, setOpen] = React.useState(false);
  const { title, chosenTab, sidebar, startD, endD } = props;

  const handleDrawerOpen = () => {
    setOpen(true);
    console.log('open', open);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    console.log('closed', open);
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <div
          style={
            open
              ? {
                  marginTop: '-55px',
                  display: 'flex',
                  justifyContent: 'center',
                }
              : {
                  marginTop: '10px',
                  display: 'flex',
                  justifyContent: 'center',
                }
          }
        >
          <img
            src="../Vida_Logo.png"
            style={
              open
                ? {
                    height: '40%',
                    marginTop: '15px'
                  }
                : { width: '70%' }
            }
            alt="logo"
          />
        </div>
        <List
          component="nav"
          aria-label="main mailbox folders"
          className={classes.list}
          style={open ? { marginTop: '-70px' } : { marginTop: '10px' }}
        >
          <Divider />
          <Link href="/dashboard">
            <ListItem
              button
              style={
                chosenTab === 'overview'
                  ? { backgroundColor: '#ebebeb' }
                  : { backgroundColor: 'white' }
              }
            >
              <ListItemIcon className={classes.icon}>
                <ViewModuleIcon />
              </ListItemIcon>
              <ListItemText className={classes.inline} primary="Overview" />
            </ListItem>
          </Link>
          <Divider />
          <Link href="/dashboard/unassigned-calls-chart">
            <ListItem
              button
              style={
                chosenTab === 'unassigned'
                  ? { backgroundColor: '#ebebeb' }
                  : { backgroundColor: 'white' }
              }
            >
              <ListItemIcon className={classes.icon}>
                <TimelineIcon />
              </ListItemIcon>
              <ListItemText
                className={classes.inline}
                primary="Unassigned Calls"
              />
            </ListItem>
          </Link>
          <Divider />
          <Link href="/dashboard/visits-not-checked-in">
            <ListItem
              button
              style={
                chosenTab === 'notChecked'
                  ? { backgroundColor: '#ebebeb' }
                  : { backgroundColor: 'white' }
              }
            >
              <ListItemIcon className={classes.icon}>
                <TableChartIcon />
              </ListItemIcon>
              <ListItemText
                className={classes.inline}
                primary="Not Checked In"
              />
            </ListItem>
          </Link>
          <Divider />
          <Link href="/dashboard/late-calls">
            <ListItem
              button
              style={
                chosenTab === 'late'
                  ? { backgroundColor: '#ebebeb' }
                  : { backgroundColor: 'white' }
              }
            >
              <ListItemIcon className={classes.icon}>
                <PollIcon />
              </ListItemIcon>
              <ListItemText className={classes.inline} primary="Late Calls" />
            </ListItem>
          </Link>
          <Divider />
          <Link href="/dashboard/missed-calls">
            <ListItem
              button
              style={
                chosenTab === 'missedCalls'
                  ? { backgroundColor: '#ebebeb' }
                  : { backgroundColor: 'white' }
              }
            >
              <ListItemIcon className={classes.icon}>
                <AnnouncementIcon />
              </ListItemIcon>
              <ListItemText
                className={classes.inline}
                primary="Missed Calls"
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      Incidents Reported
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
          </Link>
          <Divider />
          <Link href="/dashboard/missing-notes">
            <ListItem
              button
              style={
                chosenTab === 'missingNotes'
                  ? { backgroundColor: '#ebebeb' }
                  : { backgroundColor: 'white' }
              }
            >
              <ListItemIcon className={classes.icon}>
                <NoteIcon />
              </ListItemIcon>
              <ListItemText
                className={classes.inline}
                primary="Missing Notes"
              />
            </ListItem>
          </Link>
          <Divider />
        </List>
        <Box
          style={{ position: 'absolute', bottom: '20px', left: '15%' }}
          mt={5}
        >
          <Copyright open={open} />
        </Box>
      </Drawer>

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {props.children}
      </main>
      <FiltersSidebar startD={startD} endD={endD} sidebar={sidebar} />
    </div>
  );
};

export default DashboardLayout;
