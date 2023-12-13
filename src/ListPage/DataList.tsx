import { ListResponse } from '../api/types';
import {
  Card,
  CardContent,
  CircularProgress,
  Font,
  Paginator,
} from '../components';

interface Props {
  data?: ListResponse;
  isLoading?: boolean;
  onChangePage: (page: number) => void;
}

export function DataList({ data, isLoading, onChangePage }: Props) {
  return (
    <Card
      as="section"
      variant="filled"
      id="data-list"
      role="grid"
      aria-live="assertive"
      aria-busy={isLoading ? 'true' : 'false'}
    >
      <CardContent as="header" className="row" role="row">
        <Font
          as="span"
          format="label-large"
          className="col-id"
          role="columnheader"
        >
          ID
        </Font>
        <Font
          as="span"
          format="label-large"
          className="col-year"
          role="columnheader"
        >
          Year
        </Font>
        <Font
          as="span"
          format="label-large"
          className="col-title"
          role="columnheader"
        >
          Title
        </Font>
        <Font
          as="span"
          format="label-large"
          className="col-winner"
          role="columnheader"
        >
          Winner
        </Font>
      </CardContent>
      {isLoading && (
        <CardContent as="div" className="loader" role="status">
          <CircularProgress />
        </CardContent>
      )}
      {!isLoading &&
        data?.content.map(movie => (
          <CardContent key={movie.id} as="div" className="row movie" role="row">
            <Font as="span" format="body-large" className="col-id" role="cell">
              {movie.id}
            </Font>
            <Font
              as="span"
              format="body-large"
              className="col-year"
              role="cell"
            >
              {movie.year}
            </Font>
            <Font
              as="span"
              format="body-large"
              className="col-title"
              role="cell"
            >
              {movie.title}
            </Font>
            <Font
              as="span"
              format="body-large"
              className="col-winner"
              role="cell"
            >
              {movie.winner ? 'Yes' : 'No'}
            </Font>
          </CardContent>
        ))}
      {!isLoading && data && (
        <CardContent as="div" className="paginator">
          <Paginator
            currentPage={data.number}
            onChangePage={onChangePage}
            pageSize={data.size}
            totalItems={data.totalElements}
            totalPages={data.totalPages}
            currentItemsCount={data.numberOfElements}
          />
        </CardContent>
      )}
    </Card>
  );
}
