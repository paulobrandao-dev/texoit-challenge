import './Dashboard.scss';
import { MultipleWinners } from './MultipleWinners';
import { WinInterval } from './WinInterval';
import { WinnerByYear } from './WinnerByYear';
import { WinnersStudios } from './WinnersStudios';

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
