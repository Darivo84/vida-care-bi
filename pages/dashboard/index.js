import gql from 'graphql-tag';
import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-apollo';
import useForm from 'react-hook-form';
import {
  Button,
  Container,
  Grid,
  TextField,
  Box,
  MenuItem,
  Menu,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import SummaryDashboardCard from '../../components/cards/SummaryDashboardCard';
import { datediff } from '../../components/overviewComponents/timeframeDisplay';
import { today, firstDay, twoWeeks, previousWeek } from '../../components/data/defaultDates';



const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    height: 'calc(100% - 64px)',
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  filtersContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginBottom: '30px',
  },
  textField: {
    fontSize: '0.875rem',
    fontWeight: '500',
    marginRight: '10px',
    marginBottom: '0px',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '10px', marginRight: '0'
    },
  },
  form: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  root: {
    height: '100vh',
  },
  submit: {
    marginRight: '10px', 
    paddingRight: '5px', 
    width: '150px',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '10px',
      width: '100%'
    },
  },
  buttonContainer: {
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    },
  }
}));

function DashboardIndexPage(props) {
  
  const GET_APPOINTMENTS = gql`
    query($start: String!, $end: String!) {
      appointments(start: $start, end: $end) {
        identifier
        client
        carer
        startDate
        endDate
        checkInDate
        checkOutDate
        notesPublic
        notesPrivate
        cancelled
        cancellationReason
      }
    }
  `;

  const [startDay, setStartDay] = useState(previousWeek);
  const [start, setStart] = useState(twoWeeks);
  const [end, setEnd] = useState(today);
  const [chosenOption, setChosenOption] = useState('');
  const [inputDefaultValueStart, setInputDefaultValueStart] = useState(startDay);
  const [inputDefaultValueEnd, setInputDefaultValueEnd] = useState(end);

  const classes = useStyles();

  // 1.) When the page loads we want to fetch a default date range.
  const { loading, error, data, refetch } = useQuery(GET_APPOINTMENTS, {
    variables: {
      // Something to bear in mind is that date formats can vary and you must make sure what the API is expecting is supplied
      start,
      end,
    },
  });
  // 2.) We need to register the fields and then pull in the getValues function to get those values when we execute the refetch function on submit.
  const { register, getValues } = useForm();
  const handleSubmit = e => {
    e.preventDefault();

    const dates = { ...getValues() };

    if (dates.start !== startDay || dates.end !== end) {
      const first = new Date(dates.start);
      const last = new Date(dates.end);
      const difference = Math.round((last - first) / (1000 * 3600 * 24));
      const previousDate = new Date(
        first.getFullYear(),
        first.getMonth(),
        first.getDate() - difference
      )
        .toJSON()
        .slice(0, 10);
      setStart(previousDate);

      setStartDay(dates.start);
      setEnd(dates.end);

      refetch({ ...getValues() });
    }
  };

  const listOfTiles = [
    'Unassigned Calls',
    'Visits Not Checked In',
    'Late Calls',
    'Incidents Reported',
    'Missed Calls',
    'Missing Notes',
  ];

  // Dropdown menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const setTimeframe = e => {
    setAnchorEl(null);
    const currentYear = firstDay.getFullYear();
    const currentMonth = firstDay.getMonth();
    const currentDay = firstDay.getDate();
    let startdate = '';
    let firstDate = '';
    let enddate = '';

    const getDaysInMonth = (year, month) => new Date(year, month, 0).getDate();

    if (e.target.id === 'lastMonth') {
      startdate = new Date(
        currentYear,
        currentMonth,
        currentDay - getDaysInMonth(currentYear, currentMonth - 1)
      )
        .toJSON()
        .slice(0, 10);
      firstDate = new Date(
        currentYear,
        currentMonth,
        currentDay - getDaysInMonth(currentYear, currentMonth - 2)
      )
        .toJSON()
        .slice(0, 10);

      setStartDay(startdate);
      setEnd(today);
      setStart(firstDate);
      setChosenOption('Last Month');
      setInputDefaultValueStart(startdate);
      setInputDefaultValueEnd(today);
      refetch({ start: firstDate, end: today });
    } else if (e.target.id === 'lastWeek') {
      startdate = new Date(currentYear, currentMonth, currentDay - 6)//tmp
        .toJSON()
        .slice(0, 10);
      firstDate = new Date(currentYear, currentMonth, currentDay - 13) //tmp
        .toJSON()
        .slice(0, 10);

      setStartDay(startdate);
      setEnd(today);
      setStart(firstDate);
      setChosenOption('Last Week');
      setInputDefaultValueStart(startdate);
      setInputDefaultValueEnd(today);
      refetch({ start: firstDate, end: today });
    } else if (e.target.id === 'nextWeek') {
      enddate = new Date(currentYear, currentMonth, currentDay + 8) //tmp
        .toJSON()
        .slice(0, 10);
      firstDate = new Date(currentYear, currentMonth, currentDay - 6) //tmp
        .toJSON()
        .slice(0, 10);

      setStartDay(today);
      setEnd(enddate);
      setStart(firstDate);
      setInputDefaultValueStart(today);
      setInputDefaultValueEnd(enddate);
      setChosenOption('Next Week');
      refetch({ start: firstDate, end: enddate });
    } else if (e.target.id === 'nextMonth') {
      enddate = new Date(
        currentYear,
        currentMonth,
        currentDay + getDaysInMonth(currentYear, currentMonth)
      )
        .toJSON()
        .slice(0, 10);
      firstDate = new Date(
        currentYear,
        currentMonth,
        currentDay - getDaysInMonth(currentYear, currentMonth - 1)
      )
        .toJSON()
        .slice(0, 10);

      setStartDay(today);
      setEnd(enddate);
      setStart(firstDate);
      setInputDefaultValueStart(today);
      setInputDefaultValueEnd(enddate);
      setChosenOption('Next Month');
      refetch({ start: firstDate, end: enddate });
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  //

  // set defaultInput value
  const handleChange = e => {
    if (e.target.id === 'start') {
      setInputDefaultValueStart(e.target.value);
    } else setInputDefaultValueEnd(e.target.value);
  };

  // set input form
  const setForm = () => (
    <form
      className={classes.form}
      noValidate
      onSubmit={handleSubmit}
    >
      <div className={classes.buttonContainer}>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
          className={classes.submit}
          variant="contained"
          color="primary"
          
        >
          {chosenOption || 'Timeframe'} <ArrowDropDownIcon />
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            onClick={e => setTimeframe(e)}
            id="lastMonth"
            style={
              chosenOption === 'Last Month'
                ? { backgroundColor: '#ecebeb' }
                : { backgroundColor: 'white' }
            }
          >
            Last Month
          </MenuItem>
          <MenuItem
            onClick={e => setTimeframe(e)}
            id="lastWeek"
            style={
              chosenOption === 'Last Week'
                ? { backgroundColor: '#ecebeb' }
                : { backgroundColor: 'white' }
            }
          >
            Last Week
          </MenuItem>
          
          <MenuItem
            onClick={e => setTimeframe(e)}
            id="nextWeek"
            style={
              chosenOption === 'Next Week'
                ? { backgroundColor: '#ecebeb' }
                : { backgroundColor: 'white' }
            }
          >
            Next Week
          </MenuItem>
          <MenuItem
            onClick={e => setTimeframe(e)}
            id="nextMonth"
            style={
              chosenOption === 'Next Month'
                ? { backgroundColor: '#ecebeb' }
                : { backgroundColor: 'white' }
            }
          >
            Next Month
          </MenuItem>
        </Menu>
      </div>
      <TextField
        id="start"
        label="from"
        name="start"
        inputRef={register}
        type="date"
        value={inputDefaultValueStart}
        format="YYYY/MM/DD"
        className={classes.textField}
        onChange={handleChange}
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
        size="small"
        
      />
      <TextField
        id="end"
        label="to"
        name="end"
        type="date"
        inputRef={register}
        value={inputDefaultValueEnd}
        format="YYYY/MM/DD"
        onChange={handleChange}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
        size="small"
        
      />
      <div className={classes.buttonContainer}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
          style={{paddingLeft: '6px !important'}}
        >
          Apply
        </Button>
      </div>
    </form>
  );

  if (loading)
    return (
      <div>
        <Container maxWidth="md" className={classes.container}>
          <div className={classes.filtersContainer}>
            <Box component="div" display="inline">
              {setForm()}
            </Box>
          </div>
          <Container style={{ margin: '0 0 10px 20px' }}>
            Results for {datediff(startDay, end)}
          </Container>
          <Container style={{ display: 'flex', alignItems: 'center' }}>
            <Grid container spacing={3}>
              {listOfTiles.map(tile => (
                <Grid item xs={12} md={4} key={tile}>
                  <SummaryDashboardCard cardTitle={tile} loading />
                </Grid>
              ))}
            </Grid>
          </Container>
        </Container>
      </div>
    );

  // Counts

  const filteredArr = data.appointments.reduce((acc, current) => {
    const x = acc.find(
      item =>
        item.carer === current.carer &&
        item.startDate === current.startDate &&
        item.endDate === current.endDate &&
        item.client === current.client
    );
    if (!x) {
      return acc.concat([current]);
    }
    return acc;
  }, []);

  const currentPeriod = filteredArr.filter(
    appointment => appointment.startDate >= startDay
  );

  const previousPer = filteredArr.filter(
    appointment => appointment.startDate < startDay
  );

  const unassignedCalls = currentPeriod.reduce((total, appointment) => {
    if (appointment.carer === '') {
      total += 1; // eslint-disable-line no-param-reassign
    }
    return total;
  }, 0);
  

  const previousUnassignedCalls = previousPer.reduce((total, appointment) => {
    if (appointment.carer === '') {
      total += 1; // eslint-disable-line no-param-reassign
    }
    return total;
  }, 0);

  const notCheckedIn = currentPeriod.reduce((total, appointment) => {
    if (
      appointment.checkInDate === null &&
      appointment.startDate.slice(0, 10) === firstDay.toJSON().slice(0, 10)
    ) {
      total += 1; // eslint-disable-line no-param-reassign
    }
    return total;
  }, 0);

  const lateCalls = currentPeriod.reduce((total, appointment) => {
    if (
      appointment.checkInDate &&
      appointment.checkInDate > appointment.startDate
    ) {
      total += 1; // eslint-disable-line no-param-reassign
    }
    return total;
  }, 0);

  const previousLateCalls = previousPer.reduce((total, appointment) => {
    if (
      appointment.checkInDate &&
      appointment.checkInDate > appointment.startDate
    ) {
      total += 1; // eslint-disable-line no-param-reassign
    }
    return total;
  }, 0);

  const missedCalls = currentPeriod.reduce((total, appointment) => {
    if (
      appointment.checkInDate === null &&
      appointment.endDate.slice(0, 10) <= today &&
      appointment.cancelled === 'false'
    ) {
      total += 1; // eslint-disable-line no-param-reassign
    }
    return total;
  }, 0);

  const incidents = 0;

  const previousMissedCalls = previousPer.reduce((total, appointment) => {
    if (
      appointment.checkInDate === null &&
      appointment.endDate.slice(0, 10) <= today &&
      appointment.cancelled === 'false'
    ) {
      total += 1; // eslint-disable-line no-param-reassign
    }
    return total;
  }, 0);

  const missingNotes = currentPeriod.reduce((total, appointment) => {
    if (
      appointment.notesPublic === '' &&
      appointment.notesPrivate === '' &&
      appointment.startDate.slice(0, 10) <= today
    ) {
      total += 1; // eslint-disable-line no-param-reassign
    }
    return total;
  }, 0);

  const previousMissingNotes = previousPer.reduce((total, appointment) => {
    if (
      appointment.notesPublic === '' &&
      appointment.notesPrivate === '' &&
      appointment.startDate.slice(0, 10) <= today
    ) {
      total += 1; // eslint-disable-line no-param-reassign
    }
    return total;
  }, 0);


  return (
    <div>
      <Container maxWidth="md" className={classes.container}>
        <div className={classes.filtersContainer}>
          <Box component="div" display="inline">
            {setForm()}
          </Box>
        </div>
        <Container style={{ margin: '0 0 10px 20px' }}>
          Results for {datediff(startDay, end)}
        </Container>
        <Container style={{ display: 'flex', alignItems: 'center' }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <SummaryDashboardCard
                cardTitle="Unassigned Calls"
                totalNumber={unassignedCalls}
                previousNumber={previousUnassignedCalls}
                link="/dashboard/unassigned-calls-chart"
                difference={datediff(startDay, end)}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <SummaryDashboardCard
                cardTitle="Visits Not Checked In"
                totalNumber={notCheckedIn}
                previousNumber="3"
                link="/dashboard/visits-not-checked-in"
                difference={datediff(startDay, end)}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <SummaryDashboardCard
                cardTitle="Late Calls"
                totalNumber={lateCalls}
                previousNumber={previousLateCalls}
                link="/dashboard/late-calls"
                difference={datediff(startDay, end)}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <SummaryDashboardCard
                cardTitle="Incidents Reported"
                totalNumber={incidents}
                previousNumber="4"
                link="/dashboard/late-calls"
                difference={datediff(startDay, end)}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <SummaryDashboardCard
                cardTitle="Missed Calls"
                totalNumber={missedCalls}
                previousNumber={previousMissedCalls}
                link="/dashboard/missed-calls"
                difference={datediff(startDay, end)}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <SummaryDashboardCard
                cardTitle="Missing Notes"
                totalNumber={missingNotes}
                previousNumber={previousMissingNotes}
                link="/dashboard/missing-notes"
                difference={datediff(startDay, end)}
              />
            </Grid>
          </Grid>
        </Container>
      </Container>
    </div>
  );
}

export default DashboardIndexPage;
