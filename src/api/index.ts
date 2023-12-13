import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
import { useSearchParamsCreator } from '../utils';
import {
  ApiProjection,
  type ApiParams,
  type ListResponse,
  type Movie,
  type MultipleWinnerYear,
  type MultipleWinnersResponse,
  type Studio,
  type WinIntervalResponse,
  type WinnerStudiosResponse,
} from './types';

const API_URL = 'https://tools.texoit.com/backend-java/api/movies';

function useApi() {
  const searchParamsCreator = useSearchParamsCreator();

  const errorHandler = useCallback((statusCode: number) => {
    switch (statusCode) {
      case 400:
        return 'Missing data or incorrect';
      case 401:
        return 'Authorization is required';
      case 403:
        return 'Access denied';
      case 404:
        return 'Resource not found';
      case 500:
      case 501:
      case 502:
        return 'Service temporarily unavailable';
      case 417:
      default:
        return 'Unexpected error';
    }
  }, []);

  const get = useCallback(
    async <T>(params: ApiParams) => {
      const query = searchParamsCreator(params);
      const response = await fetch(`${API_URL}${query}`);
      if (response.ok) {
        const result = (await response.json()) as T;
        return result;
      } else {
        const error = errorHandler(response.status);
        throw error;
      }
    },
    [errorHandler, searchParamsCreator],
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

  return useQuery<ListResponse, string>({
    queryKey: [QueryKeyNames.list, params],
    queryFn: async () => {
      const result = await api.get<ListResponse>(params);
      return result;
    },
  });
}

export function useMultipleWinners() {
  const api = useApi();
  const params: ApiParams = {
    projection: ApiProjection.multipleWinners,
  };

  return useQuery<MultipleWinnerYear[], string>({
    queryKey: [QueryKeyNames.multipleWinners, params],
    queryFn: async () => {
      const result = await api.get<MultipleWinnersResponse>(params);
      return result.years;
    },
  });
}

export function useWinnersStudios() {
  const api = useApi();
  const params: ApiParams = {
    projection: ApiProjection.studiosWinCount,
  };

  return useQuery<Studio[], string>({
    queryKey: [QueryKeyNames.winnerStudios, params],
    queryFn: async () => {
      const result = await api.get<WinnerStudiosResponse>(params);
      return result.studios;
    },
  });
}

export function useWinInterval() {
  const api = useApi();
  const params: ApiParams = {
    projection: ApiProjection.winIntervals,
  };

  return useQuery<WinIntervalResponse, string>({
    queryKey: [QueryKeyNames.producersWinInterval, params],
    queryFn: async () => {
      const result = await api.get<WinIntervalResponse>(params);
      return result;
    },
  });
}

export function useWinnerByYear(year?: number) {
  const api = useApi();

  return useQuery<Movie[], string>({
    enabled: year !== undefined,
    queryKey: [QueryKeyNames.winnerByYear, year],
    queryFn: async () => {
      const result = await api.get<Movie[]>({ year, winner: true });
      return result;
    },
  });
}
