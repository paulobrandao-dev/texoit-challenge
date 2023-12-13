import { useEffect } from 'react';
import { useMultipleWinners } from '../api';
import { Card, CardContent, CircularProgress, Font } from '../components';
import { useToast } from '../utils';

export function MultipleWinners() {
  const multipleWinners = useMultipleWinners();
  const toast = useToast();

  useEffect(() => {
    if (multipleWinners.isError) {
      toast({
        message: multipleWinners.error,
      });
    }
  }, [multipleWinners, toast]);

  return (
    <Card as="section" variant="filled" id="card-multiple-winners">
      <CardContent as="header">
        <Font as="h2" format="headline-medium">
          List years with multiple winners
        </Font>
      </CardContent>
      {multipleWinners.data !== undefined && (
        <CardContent as="div" className="row header" role="row">
          <Font as="span" format="label-medium" role="columnheader">
            Year
          </Font>
          <Font as="span" format="label-medium" role="columnheader">
            Win Count
          </Font>
        </CardContent>
      )}
      {multipleWinners.isLoading && (
        <CardContent as="div" className="loader" role="status">
          <CircularProgress />
        </CardContent>
      )}
      {!multipleWinners.isLoading &&
        multipleWinners.data?.map((winner, idx) => (
          <CardContent
            key={`${idx}-${winner.year}-${winner.winnerCount}`}
            as="div"
            className="row entry"
            role="row"
          >
            <Font as="span" format="body-large">
              {winner.year}
            </Font>
            <Font as="span" format="body-large">
              {winner.winnerCount}
            </Font>
          </CardContent>
        ))}
    </Card>
  );
}
