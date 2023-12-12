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
    <Card as="section" variant="filled" id="data-list">
      <CardContent as="header" className="row">
        <Font as="span" format="title-large" className="col-id">
          ID
        </Font>
        <Font as="span" format="title-large" className="col-year">
          Year
        </Font>
        <Font as="span" format="title-large" className="col-title">
          Title
        </Font>
        <Font as="span" format="title-large" className="col-winner">
          Winner
        </Font>
      </CardContent>
      {isLoading && (
        <CardContent as="div" className="loader">
          <CircularProgress />
        </CardContent>
      )}
      {!isLoading &&
        data?.content.map(movie => (
          <CardContent key={movie.id} as="div" className="row movie">
            <Font as="span" format="body-large" className="col-id">
              {movie.id}
            </Font>
            <Font as="span" format="body-large" className="col-year">
              {movie.year}
            </Font>
            <Font as="span" format="body-large" className="col-title">
              {movie.title}
            </Font>
            <Font as="span" format="body-large" className="col-winner">
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
