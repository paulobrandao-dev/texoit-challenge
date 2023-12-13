import { useEffect } from 'react';
import { useWinnersStudios } from '../api';
import { Card, CardContent, CircularProgress, Font } from '../components';
import { useToast } from '../utils';

export function WinnersStudios() {
  const winnersStudios = useWinnersStudios();
  const toast = useToast();

  useEffect(() => {
    if (winnersStudios.isError) {
      toast({
        message: winnersStudios.error,
      });
    }
  }, [winnersStudios, toast]);

  return (
    <Card as="section" variant="filled" id="card-studio-winners">
      <CardContent as="header">
        <Font as="h2" format="headline-medium">
          Top 3 studios with winners
        </Font>
      </CardContent>
      {winnersStudios.data !== undefined && (
        <CardContent as="div" className="row header" role="row">
          <Font as="span" format="label-medium" role="columnheader">
            Name
          </Font>
          <Font as="span" format="label-medium" role="columnheader">
            Win Count
          </Font>
        </CardContent>
      )}
      {winnersStudios.isLoading && (
        <CardContent as="div" className="loader" role="status">
          <CircularProgress />
        </CardContent>
      )}
      {!winnersStudios.isLoading &&
        winnersStudios.data?.slice(0, 3).map((winner, idx) => (
          <CardContent
            key={`${idx}-${winner.name}-${winner.winCount}`}
            as="div"
            className="row entry"
            role="row"
            aria-label="Studio winner"
          >
            <Font as="span" format="body-large">
              {winner.name}
            </Font>
            <Font as="span" format="body-large">
              {winner.winCount}
            </Font>
          </CardContent>
        ))}
    </Card>
  );
}
