import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';
import { Container, Typography, Box } from '@material-ui/core';
import { ResponsiveLine } from '@nivo/line';
import { useStyles } from '../../components/styles/dashboardStyles';
import { today, firstDay, lastDay, nextweek } from '../../components/data/defaultDates';

function DashboardIndexPage() {
  
  const GET_APPOINTMENTS = gql`
    query($start: String!, $end: String!) {
      appointments(start: $start, end: $end) {
        carer
        startDate
      }
    }
  `;

  const [start, setStart] = useState("2020-02-05"); //temporary date
  const [end, setEnd] = useState("2020-02-20"); //temporary date
  

  const { loading, error, data, refetch } = useQuery(GET_APPOINTMENTS, {
    variables: {
      // Something to bear in mind is that date formats can vary and you must make sure what the API is expecting is supplied
      start,
      end,
    },
  });


  const classes = useStyles();

  if (loading) return <h1>Loading</h1>


  const filterCalls = () => {
    const result = []
    const dict = {}
    data.appointments.map(item => {
      if (!dict.hasOwnProperty(item.startDate.slice(5, 10).replace('-', '/'))) {
        dict[item.startDate.slice(5, 10).replace('-', '/')] = 0
      } 
      if (item.carer === ''){
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
      id: 'Unassigned',
      color: 'hsl(122, 70%, 50%)',
      data: filterCalls()
    }
  ]

  return (
    <div style={{ height: 'calc(100% - 64px)' }}>
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
                  direction: 'row',
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
        </Container>
      </div>
    </div>
  );
}

export default DashboardIndexPage;
