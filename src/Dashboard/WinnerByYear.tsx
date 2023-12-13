import { useEffect, useMemo, useState } from 'react';
import { useWinnerByYear } from '../api';
import {
  ButtonIcon,
  Card,
  CardContent,
  CircularProgress,
  Font,
  Icon,
  TextField,
} from '../components';
import { useOnlyNumberInput, useToast } from '../utils';

export function WinnerByYear() {
  const [value, setValue] = useState<number>();
  const [year, setYear] = useState<number>();
  const winnerByYear = useWinnerByYear(year);
  const toast = useToast();
  const onlyNumberInput = useOnlyNumberInput();

  const yearIsValid = useMemo(() => {
    if (value === undefined) {
      return false;
    }
    if (value.toString().length !== 4) {
      return false;
    }
    if (value > new Date().getFullYear()) {
      return false;
    }
    return true;
  }, [value]);

  useEffect(() => {
    if (winnerByYear.isError) {
      toast({
        message: winnerByYear.error,
      });
    }
  }, [winnerByYear, toast]);

  return (
    <Card as="section" variant="filled" id="card-winner-year">
      <CardContent as="header">
        <TextField
          label="List movie winners by year"
          placeholder="Search by year"
          endNode={
            value === year && yearIsValid ? (
              <ButtonIcon
                onClick={() => {
                  setYear(undefined);
                  setValue(undefined);
                }}
                aria-label="Clear serach"
              >
                <Icon aria-hidden="true">close</Icon>
              </ButtonIcon>
            ) : (
              <ButtonIcon
                onClick={() => setYear(value)}
                aria-label="Search movie"
                disabled={!yearIsValid}
              >
                <Icon aria-hidden="true">search</Icon>
              </ButtonIcon>
            )
          }
          value={value || ''}
          type="number"
          onChange={e => {
            const newValue = onlyNumberInput(e.target.value, 4);
            setValue(newValue.length ? Number(newValue) : undefined);
          }}
          minLength={4}
          maxLength={4}
          inputMode="numeric"
        />
      </CardContent>
      {winnerByYear.data !== undefined && (
        <CardContent as="div" className="row header" role="row">
          <Font as="span" format="label-medium" role="columnheader">
            Id
          </Font>
          <Font as="span" format="label-medium" role="columnheader">
            Year
          </Font>
          <Font as="span" format="label-medium" role="columnheader">
            Title
          </Font>
        </CardContent>
      )}
      {winnerByYear.isLoading && (
        <CardContent as="div" className="loader" role="status">
          <CircularProgress />
        </CardContent>
      )}
      {!winnerByYear.isLoading &&
        winnerByYear.data?.map(winner => (
          <CardContent
            key={winner.id}
            as="div"
            className="row entry"
            role="row"
            aria-label="Movie winner in this year"
          >
            <Font as="span" format="body-large">
              {winner.id}
            </Font>
            <Font as="span" format="body-large">
              {winner.year}
            </Font>
            <Font as="span" format="body-large">
              {winner.title}
            </Font>
          </CardContent>
        ))}
    </Card>
  );
}
