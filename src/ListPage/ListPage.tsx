import { useEffect, useReducer } from 'react';
import { useMovieList } from '../api';
import { Font } from '../components';
import { DataList } from './DataList';
import { ListFilters } from './Filters';
import { INITIAL_VALUES, listPageReducer } from './reducer';
import './ListPage.scss';

export function ListPage() {
  const [params, setParams] = useReducer(listPageReducer, INITIAL_VALUES);
  const movieList = useMovieList(params);

  useEffect(() => {
    if (movieList.isError) {
      console.error(movieList.error);
    }
  }, [movieList]);

  return (
    <article id="ListPage">
      <header>
        <Font as="h1" format="headline-large">
          List Movies
        </Font>
      </header>
      <ListFilters onFilter={filters => setParams({ ...filters, page: 0 })} />
      <DataList
        data={movieList.data}
        isLoading={movieList.isLoading}
        onChangePage={page => setParams({ page })}
      />
    </article>
  );
}
