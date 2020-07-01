import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';
import { ResponsiveLine } from '@nivo/line';
import {
  Container,
  Paper,
  Typography,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';
import { useStyles } from '../../components/styles/dashboardStyles';
import { today, firstDay, lastDay, nextweek } from '../../components/data/defaultDates';



export default function MissingNotes() {
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
        notesPublic
        notesPrivate
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


  const filterCalls = () => {
    const result = []
    const dict = {}
    data.appointments.map(item => {
      if (!dict.hasOwnProperty(item.startDate.slice(5, 10).replace('-', '/'))) {
        dict[item.startDate.slice(5, 10).replace('-', '/')] = 0
      } 
      if (item.notesPublic === '' &&
      item.notesPrivate === '' &&
      item.startDate.slice(0, 10) <= today){
        dict[item.startDate.slice(5, 10).replace('-', '/')]++
      }
    })
    Object.keys(dict).forEach(function (key) {
      var value = dict[key];
       result.push({x: key, y: value})
    });
    result.sort((a, b) => a.x.slice(3, 5) - b.x.slice(3, 5))
    return result
  };

  const graphData = [
    {
      id: 'Missing Notes',
      color: 'hsl(122, 70%, 50%)',
      data: filterCalls()
    }
  ]

  function createData(time, сlient, carer) {
  return { time, сlient, carer };
  }

  const allMissingNotes = data.appointments.filter(item => item.notesPublic === '' &&
  item.notesPrivate === '' &&
  item.startDate.slice(0, 10) <= today)

  const rows = [];

  allMissingNotes.map(item => {
    rows.push(createData(item.checkInDate,item.client,item.carer))
  })

  return (
    <div style={{ height: 'calc(100% - 64px)', marginTop: '20px' }}>
      <div className={classes.dashboardContainer}>
        <Container maxWidth="md" className={classes.container}>
          <div className={classes.graphContainer} style={{ height: `${50}vw` }}>
            <ResponsiveLine
              data={graphData}
              margin={{ top: 40, right: 40, bottom: 50, left: 40 }}
              xScale={{ type: 'point' }}
              yScale={{
                type: 'linear',
                min: 'auto',
                max: 'auto',
                stacked: true,
                reverse: false,
              }}
              axisTop={null}
              lineWidth={4}
              axisRight={null}
              axisBottom={{
                orient: 'bottom',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Date',
                legendOffset: 36,
                legendPosition: 'middle',
              }}
              axisLeft={{
                orient: 'left',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: '',
                legendOffset: -40,
                legendPosition: 'middle',
              }}
              colors={{ scheme: 'nivo' }}
              pointSize={10}
              pointColor='#ffffff'
              pointBorderWidth={2}
              pointBorderColor={{ from: 'serieColor' }}
              pointLabel="y"
              pointLabelYOffset={-12}
              useMesh
              legends={[
                {
                  anchor: 'bottom-right',
                  direction: 'column',
                  justify: false,
                  translateX: 0,
                  translateY: 46,
                  itemsSpacing: 0,
                  itemDirection: 'left-to-right',
                  itemWidth: 80,
                  itemHeight: 20,
                  itemOpacity: 0.75,
                  symbolSize: 12,
                  symbolShape: 'circle',
                  symbolBorderColor: 'rgba(0, 0, 0, .5)',
                  effects: [
                    {
                      on: 'hover',
                      style: {
                        itemBackground: 'rgba(0, 0, 0, .03)',
                        itemOpacity: 1,
                      },
                    },
                  ],
                },
              ]}
            />
            <div className={classes.totalContainer}>
              <Box component="div" display="inline">
                <Typography className={classes.total}>
                  TOTAL: {graphData[0].data.length}
                </Typography>
              </Box>
            </div>
          </div>

          <Container
            style={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              padding: '0',
              marginTop: '20px',
              marginBottom: '50px',
              boxShadow: '0px 2px 5px 0px rgba(0,0,0,0.4)',
              borderRadius: '8px',
            }}
            className={classes.container}
          >
            <TableContainer
              style={{ width: '100%', marginTop: '20px' }}
              component={Paper}
            >
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Time of visit</TableCell>
                    <TableCell align="left">Client</TableCell>
                    <TableCell align="left">Carer</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map(row => (
                    <TableRow key={row.сlient}>
                      <TableCell align="left">{row.time}</TableCell>
                      <TableCell align="left">{row.сlient}</TableCell>
                      <TableCell align="left">{row.carer}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            
          </Container>
        </Container>
      </div>
    </div>
  );
}
