import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';
import { ResponsiveBar } from '@nivo/bar';
import { Container, Typography, Box } from '@material-ui/core';
import { useStyles } from '../../components/styles/dashboardStyles';
import { today, firstDay, lastDay, nextweek } from '../../components/data/defaultDates';

export default function MissedCalls() {
  const classes = useStyles();

  const [start, setStart] = useState("2020-02-05"); //temporary date
  const [end, setEnd] = useState("2020-02-20"); //temporary date

  const GET_APPOINTMENTS = gql`
    query($start: String!, $end: String!) {
      appointments(start: $start, end: $end) {
        startDate
        endDate
        checkInDate
        cancelled

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

  const graphData = []

  const allMissedCalls = data.appointments.filter(item => item.checkInDate === null &&
    item.endDate.slice(0, 10) <= today &&
    item.cancelled === 'false')

  const filterCalls = () => {
    const result = []
    const dict = {}
    data.appointments.map(item => {
      if (!dict.hasOwnProperty(item.startDate.slice(5, 10).replace('-', '/'))) {
        dict[item.startDate.slice(5, 10).replace('-', '/')] = {
          date: item.startDate.slice(5, 10).replace('-', '/'),
          Missed: 0,
          MissedColor: 'hsl(45, 70%, 50%)',
          Incidents: 10, //temporary number
          IncidentsColor: 'hsl(103, 70%, 50%)',
        }
      } 
      if (item.checkInDate === null &&
        item.endDate.slice(0, 10) <= today &&
        item.cancelled === 'false'){
        dict[item.startDate.slice(5, 10).replace('-', '/')].Missed += 1
      }
    })

    Object.values(dict).forEach(item => {
       result.push(item)
    });
    result.sort((a, b) => a.date.slice(3, 5) - b.date.slice(3, 5))
    return result
  };


  return (
    <div style={{ height: 'calc(100% - 64px)' }}>
      <div className={classes.dashboardContainer}>
        <Container maxWidth="md" className={classes.container}>
          <div className={classes.graphContainer} style={{ height: `${50}vw` }}>
            <ResponsiveBar
              data={filterCalls()}
              keys={['Missed', 'Incidents']}
              indexBy="date"
              margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
              padding={0.3}
              colors={{ scheme: 'accent' }}
              groupMode="grouped"
              defs={[
                {
                  id: 'dots',
                  type: 'patternDots',
                  background: 'inherit',
                  color: '#38bcb2',
                  size: 4,
                  padding: 1,
                  stagger: true,
                },
                {
                  id: 'lines',
                  type: 'patternLines',
                  background: 'inherit',
                  color: '#eed312',
                  rotation: -45,
                  lineWidth: 6,
                  spacing: 10,
                },
              ]}
              borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
              axisTop={null}
              axisRight={null}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'date',
                legendPosition: 'middle',
                legendOffset: 32,
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Count',
                legendPosition: 'middle',
                legendOffset: -40,
              }}
              labelSkipWidth={12}
              labelSkipHeight={12}
              labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
              legends={[
                {
                  dataFrom: 'keys',
                  anchor: 'bottom-right',
                  direction: 'column',
                  justify: false,
                  translateX: 120,
                  translateY: 0,
                  itemsSpacing: 2,
                  itemWidth: 100,
                  itemHeight: 20,
                  itemDirection: 'left-to-right',
                  itemOpacity: 0.85,
                  symbolSize: 20,
                  effects: [
                    {
                      on: 'hover',
                      style: {
                        itemOpacity: 1,
                      },
                    },
                  ],
                },
              ]}
              animate
              motionStiffness={90}
              motionDamping={15}
            />
            <div className={classes.totalContainer}>
              <Box component="div" display="inline">
                <Typography className={classes.total}>
                  TOTAL MISSED CALLS: {missedCallsData.length}
                </Typography>
              </Box>
              <Box
                component="div"
                display="inline"
                style={{ width: '200px', marginLeft: '15px' }}
              >
                <Typography className={classes.total}>
                  TOTAL INCIDENTS: {missedCallsData.length}
                </Typography>
              </Box>
            </div>
            <div className={classes.totalContainer}></div>
          </div>
        </Container>
      </div>
    </div>
  );
}
