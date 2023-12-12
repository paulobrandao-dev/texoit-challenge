import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
import { useSearchParamsCreator } from '../utils';
import type {
  ApiParams,
  ListResponse,
  Movie,
  MultipleWinnerYear,
  MultipleWinnersResponse,
  Studio,
  WinIntervalResponse,
  WinnerStudiosResponse,
} from './types';

const API_URL = 'https://tools.texoit.com/backend-java/api/movies';

function useApi() {
  const searchParamsCreator = useSearchParamsCreator();

  const get = useCallback(
    async <T>(params: ApiParams) => {
      const query = searchParamsCreator(params);
      const response = await fetch(`${API_URL}${query}`);
      if (response.ok) {
        const result = (await response.json()) as T;
        return result;
      } else {
        const error = (await response.json()) as Record<string, string>;
        throw error;
      }
    },
    [searchParamsCreator],
  );

  return { get };
}

export enum QueryKeyNames {
  list = 'getMovieList',
  multipleWinners = 'getMultiplesWinners',
  winnerStudios = 'getWinnerStudios',
  producersWinInterval = 'getProcucersWinInterval',
  winnerByYear = 'getWinnerByYear',
}

export function useMovieList(params: ApiParams) {
  const api = useApi();

  return useQuery<ListResponse, Record<string, string>>({
    queryKey: [QueryKeyNames.list, params],
    queryFn: async () => {
      const result = await api.get<ListResponse>(params);
      return result;
    },
  });
}

export function useMultipleWinners(params: ApiParams) {
  const api = useApi();

  return useQuery<MultipleWinnerYear[], Record<string, string>>({
    queryKey: [QueryKeyNames.multipleWinners, params],
    queryFn: async () => {
      const result = await api.get<MultipleWinnersResponse>(params);
      return result.years;
    },
  });
}

export function useWinnerStudios(params: ApiParams) {
  const api = useApi();

  return useQuery<Studio[], Record<string, string>>({
    queryKey: [QueryKeyNames.winnerStudios, params],
    queryFn: async () => {
      const result = await api.get<WinnerStudiosResponse>(params);
      return result.studios;
    },
  });
}

export function useWinInterval(params: ApiParams) {
  const api = useApi();

  return useQuery<WinIntervalResponse, Record<string, string>>({
    queryKey: [QueryKeyNames.producersWinInterval, params],
    queryFn: async () => {
      const result = await api.get<WinIntervalResponse>(params);
      return result;
    },
  });
}

export function useWinnerByYear(params: ApiParams) {
  const api = useApi();

  return useQuery<Movie, Record<string, string>>({
    queryKey: [QueryKeyNames.winnerByYear, params],
    queryFn: async () => {
      const result = await api.get<Movie>(params);
      return result;
    },
  });
}
