import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';

const useStyles = makeStyles({
  card: {
    width: '100%',
    height: '210px',
    cursor: 'pointer',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard({
  cardTitle,
  totalNumber,
  previousNumber,
  link,
  loading,
  difference,
}) {
  const classes = useStyles();
  let percentResult;
  const Difference = () => {
    const result = totalNumber - previousNumber;
    if (previousNumber === 0) {
      return (
        <Typography align="center" variant="body2" component="p">
          {Math.sign(result) === 1
            ? `+${result.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}`
            : result.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}
          <span>
            {' '}
            (<span style={{ color: 'red' }}> - </span>)
          </span>
          <br />{' '}
          <span
            style={{
              color: 'grey',
            }}
          >
            compared to previous
            <br /> {difference}
          </span>
        </Typography>
      );
    }
    if (result !== 0) {
      percentResult = Math.floor(
        ((totalNumber - previousNumber) / previousNumber) * 100
      );
    } else percentResult = 0;

    let percentColor;
    if (Math.sign(result) === 1 && result !== 0) {
      percentColor = 'red';
    } else {
      percentColor = '#00c437';
    }
    return (
      <Typography align="center" variant="body2" component="p">
        {Math.sign(result) === 1
          ? `+${result.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}`
          : result.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}
        <span> (</span>
        <span style={{ color: percentColor }}>
          {Math.sign(percentResult) === 1
            ? `${percentResult
                .toString()
                .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}%`
            : `${Math.abs(percentResult)
                .toString()
                .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}%`}
        </span>
        <span>)</span>
        <br />{' '}
        <span
          style={{
            color: 'grey',
          }}
        >
          compared to previous
          <br /> {difference}
        </span>
      </Typography>
    );
  };
  if (!loading) {
    return (
      <Card className={classes.card}>
        <Link href={link}>
          <CardContent
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
            }}
          >
            <Typography align="center" variant="h5" component="h2">
              {cardTitle}
            </Typography>
            <Typography align="center" variant="h2" color="textSecondary">
              {totalNumber
                .toString()
                .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}
            </Typography>
            {cardTitle === 'Visits Not Checked In' ? (
              <Typography align="center" variant="body2" component="p">
                Today
              </Typography>
            ) : (
              <Difference />
            )}
          </CardContent>
        </Link>
      </Card>
    );
  }
  return (
    <Card className={classes.card}>
      <CardContent
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
        }}
      >
        <Typography align="center" variant="h5" component="h2">
          {cardTitle}
        </Typography>
        <Typography align="center" variant="h6" color="textSecondary">
          Loading
        </Typography>
        <Typography align="center" variant="body2" component="p">
          ...
        </Typography>
      </CardContent>
    </Card>
  );
}
