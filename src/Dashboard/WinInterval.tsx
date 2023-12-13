import { Fragment, useEffect } from 'react';
import { useWinInterval } from '../api';
import { useToast } from '../utils';
import { Card, CardContent, CircularProgress, Font } from '../components';

export function WinInterval() {
  const winInterval = useWinInterval();
  const toast = useToast();

  useEffect(() => {
    if (winInterval.isError) {
      toast({
        message: winInterval.error,
      });
    }
  }, [winInterval, toast]);

  return (
    <Card as="section" variant="filled" id="card-interval-winners">
      <CardContent as="header">
        <Font as="h2" format="headline-medium">
          Producers with longest and shortest interval between wins
        </Font>
      </CardContent>
      {winInterval.isLoading && (
        <CardContent as="div" className="loader" role="status">
          <CircularProgress />
        </CardContent>
      )}
      {!winInterval.isLoading &&
        winInterval.data?.max.map((winner, idx) => (
          <Fragment key={`${idx}-${winner.producer}`}>
            <CardContent as="div" className="caption">
              <Font as="h3" format="title-large">
                Maximum
              </Font>
            </CardContent>
            <CardContent as="div" className="row header" role="row">
              <Font as="span" format="label-medium" role="columnheader">
                Producer
              </Font>
              <Font as="span" format="label-medium" role="columnheader">
                Interval
              </Font>
              <Font as="span" format="label-medium" role="columnheader">
                Previous Year
              </Font>
              <Font as="span" format="label-medium" role="columnheader">
                Following Year
              </Font>
            </CardContent>
            <CardContent as="div" className="row entry" role="row">
              <Font as="span" format="body-large">
                {winner.producer}
              </Font>
              <Font as="span" format="body-large">
                {winner.interval}
              </Font>
              <Font as="span" format="body-large">
                {winner.previousWin}
              </Font>
              <Font as="span" format="body-large">
                {winner.followingWin}
              </Font>
            </CardContent>
          </Fragment>
        ))}
      {!winInterval.isLoading &&
        winInterval.data?.min.map((winner, idx) => (
          <Fragment key={`${idx}-${winner.producer}`}>
            <CardContent as="div" className="caption">
              <Font as="h3" format="title-large">
                Minimum
              </Font>
            </CardContent>
            <CardContent as="div" className="row header" role="row">
              <Font as="span" format="label-medium" role="columnheader">
                Producer
              </Font>
              <Font as="span" format="label-medium" role="columnheader">
                Interval
              </Font>
              <Font as="span" format="label-medium" role="columnheader">
                Previous Year
              </Font>
              <Font as="span" format="label-medium" role="columnheader">
                Following Year
              </Font>
            </CardContent>
            <CardContent as="div" className="row entry" role="row">
              <Font as="span" format="body-large">
                {winner.producer}
              </Font>
              <Font as="span" format="body-large">
                {winner.interval}
              </Font>
              <Font as="span" format="body-large">
                {winner.previousWin}
              </Font>
              <Font as="span" format="body-large">
                {winner.followingWin}
              </Font>
            </CardContent>
          </Fragment>
        ))}
    </Card>
  );
}
