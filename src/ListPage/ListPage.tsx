import { useEffect, useReducer } from 'react';
import { useMovieList } from '../api';
import { Font } from '../components';
import { DataList } from './DataList';
import { ListFilters } from './Filters';
import { INITIAL_VALUES, listPageReducer } from './reducer';
import './ListPage.scss';
import { useToast } from '../utils';

export function ListPage() {
  const [params, setParams] = useReducer(listPageReducer, INITIAL_VALUES);
  const movieList = useMovieList(params);
  const toast = useToast();

  useEffect(() => {
    if (movieList.isError) {
      toast({
        message: movieList.error,
      });
    }
  }, [movieList, toast]);

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
