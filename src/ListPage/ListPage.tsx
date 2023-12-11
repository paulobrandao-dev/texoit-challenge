import { useEffect } from 'react';
import { useMovieList } from '../api';
import { Font } from '../components';
import './ListPage.scss';

export function ListPage() {
  // const [page, setPage] = useState<number>(0);
  const movieList = useMovieList({
    page: 0,
    size: 15,
    year: 2019,
  });

  useEffect(() => {
    if (movieList.data) {
      console.log(movieList.data);
    } else if (movieList.isError) {
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
    </article>
  );
}
