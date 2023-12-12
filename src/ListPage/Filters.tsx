import { FormEvent, useCallback, useMemo, useState } from 'react';
import { Button, Icon, SelecField, TextField } from '../components';
import { useMediaQuery, useOnlyNumberInput } from '../utils';
import { ApiParams } from '../api/types';

interface Props {
  onFilter: (filters: ApiParams) => void;
}

export function ListFilters({ onFilter }: Props) {
  const media = useMediaQuery();
  const [winner, setWinnersFilter] = useState<boolean>();
  const [year, setYearFilter] = useState<number>();
  const onlyNumberInput = useOnlyNumberInput();

  const selectValue = useMemo(() => {
    if (winner !== undefined) {
      return winner ? 'true' : 'false';
    }
    return undefined;
  }, [winner]);

  const yearIsValid = useMemo(() => {
    if (year === undefined) {
      return true;
    }
    if (year.toString().length !== 4) {
      return false;
    }
    if (year > new Date().getFullYear()) {
      return false;
    }
    return true;
  }, [year]);

  const handleReset = useCallback(() => {
    console.log('call reset');
    setWinnersFilter(undefined);
    setYearFilter(undefined);
  }, []);

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!yearIsValid) return;
      onFilter({
        winner,
        year,
      });
    },
    [onFilter, winner, year, yearIsValid],
  );

  return (
    <form id="list-filters" onSubmit={handleSubmit} onReset={handleReset}>
      <TextField
        label="Filter by year"
        value={year || ''}
        type="number"
        onChange={e => {
          const newValue = onlyNumberInput(e.target.value, 4);
          setYearFilter(newValue.length ? Number(newValue) : undefined);
        }}
        minLength={4}
        maxLength={4}
        inputMode="numeric"
      />
      <SelecField
        label="Filter by winner"
        value={selectValue}
        onChange={newValue => {
          if (newValue !== undefined) {
            setWinnersFilter(newValue === 'true');
          } else {
            setWinnersFilter(undefined);
          }
        }}
        options={[
          { label: 'View All' },
          { label: 'Only winner', value: 'true' },
          { label: 'No winners', value: 'false' },
        ]}
      />
      <div className="actions">
        <Button
          type="reset"
          variant="tonal"
          icon={<Icon size={20}>filter_alt_off</Icon>}
          disabled={[winner, year].every(value => value === undefined)}
          fullWidth={media.isCompactScreen}
        >
          Clear
        </Button>
        <Button
          type="submit"
          icon={<Icon size={20}>filter_alt</Icon>}
          fullWidth={media.isCompactScreen}
        >
          Filter
        </Button>
      </div>
    </form>
  );
}
