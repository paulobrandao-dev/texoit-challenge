import { MultipleWinners } from './MultipleWinners';
import { WinInterval } from './WinInterval';
import { WinnerByYear } from './WinnerByYear';
import { WinnersStudios } from './WinnersStudios';
import './Dashboard.scss';

export function Dashboard() {
  return (
    <article id="Dashboard">
      <WinnerByYear />
      <WinInterval />
      <MultipleWinners />
      <WinnersStudios />
    </article>
  );
}
