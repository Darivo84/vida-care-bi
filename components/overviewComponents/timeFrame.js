
import React, { useState } from 'react';
import useForm from 'react-hook-form';
import gql from 'graphql-tag';

import {
    Button,
    Container,
    Grid,
    TextField,
    Box,
    MenuItem,
    Menu,
    useMediaQuery,
  } from '@material-ui/core';

import { datediff } from '../overviewComponents/timeframeDisplay';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from 'react-apollo';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import SummaryDashboardCard from '../../components/cards/SummaryDashboardCard';

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


export default function DatePicker(props) {

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

    const classes = useStyles();

    const today = new Date().toJSON().slice(0, 10);
    const firstDay = new Date();
    const lastDay = new Date(
    firstDay.getFullYear(),
    firstDay.getMonth(),
    firstDay.getDate() + 7
    );
    const previousWeek = new Date(
        firstDay.getFullYear(),
        firstDay.getMonth(),
        firstDay.getDate() - 7
    )
        .toJSON()
        .slice(0, 10);
        
    const nextweek = lastDay.toJSON().slice(0, 10);
    
    const [startDay, setStartDay] = useState(today);
    const [start, setStart] = useState(previousWeek);
    const [end, setEnd] = useState(nextweek);
    const [chosenOption, setChosenOption] = useState('');
    const [inputDefaultValueStart, setInputDefaultValueStart] = useState(start);
    const [inputDefaultValueEnd, setInputDefaultValueEnd] = useState(end);

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
      startdate = new Date(currentYear, currentMonth, currentDay - 7)
        .toJSON()
        .slice(0, 10);
      firstDate = new Date(currentYear, currentMonth, currentDay - 14)
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
      enddate = new Date(currentYear, currentMonth, currentDay + 7)
        .toJSON()
        .slice(0, 10);
      firstDate = new Date(currentYear, currentMonth, currentDay - 7)
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


  return (
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
            id="today"
            style={
                chosenOption === 'today'
                ? { backgroundColor: '#ecebeb' }
                : { backgroundColor: 'white' }
            }
            >
            Today
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
  )

}