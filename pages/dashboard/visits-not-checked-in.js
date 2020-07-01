import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  Typography,
  Box,
} from '@material-ui/core';
import { useStyles } from '../../components/styles/dashboardStyles';
import { today, firstDay, lastDay, nextweek } from '../../components/data/defaultDates';


export default function SimpleTable() {
  const classes = useStyles();

  const [start, setStart] = useState("2020-02-05"); //temporary date
  const [end, setEnd] = useState("2020-02-20"); //temporary date

  const GET_APPOINTMENTS = gql`
    query($start: String!, $end: String!) {
      appointments(start: $start, end: $end) {
        client
        carer
        startDate
        checkInDate
        checkOutDate
        endDate

      }
    }
  `;


  const { loading, error, data, refetch } = useQuery(GET_APPOINTMENTS, {
    variables: {
      // Something to bear in mind is that date formats can vary and you must make sure what the API is expecting is supplied
      start,
      end,
    },
  });

  if (loading) return <h1>Loading</h1>

  function createData(time, сlient, carer, status) {
    return { time, сlient, carer, status };
  }
  
  const allNotCheckedIn = data.appointments.filter(item => item.checkInDate === null )
  
  const rows = [];
  const setStatus =(checkIn, checkOut)=> {
    if (checkIn === null && checkOut === null) {
      return 'Not checked in/out'
    } else if (checkIn === null ) {
      return 'Not checked in'
    }
  }

  allNotCheckedIn.map(item => {
    rows.push(createData(item.startDate.slice(0, 10),item.client,item.carer, setStatus(item.checkInDate, item.checkOutDate)))
  })

  return (
    <div style={{ height: 'calc(100% - 64px)' }}>
      <div className={classes.dashboardContainer}>
        <Container maxWidth="md" className={classes.container}>
          <div className={classes.graphContainer} style={{height: '100% !important'}}>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">
                      Time of visit Start and End
                    </TableCell>
                    <TableCell align="left">Client</TableCell>
                    <TableCell align="left">Carer</TableCell>
                    <TableCell align="left">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map(row => (
                    <TableRow key={row.time}>
                      <TableCell align="left">{row.time}</TableCell>
                      <TableCell align="left">{row.сlient}</TableCell>
                      <TableCell align="left">{row.carer}</TableCell>
                      <TableCell align="left">{row.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <div
              className={classes.totalContainer}
              style={{ marginLeft: '15px' }}
            >
              <Box component="div" display="inline">
                <Typography className={classes.total}>
                  TOTAL: {rows.length}
                </Typography>
              </Box>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
