import { RequestPattern } from '../utils';

export enum ApiProjection {
  multipleWinners = 'years-with-multiple-winners',
  studiosWinCount = 'studios-with-win-count',
  winIntervals = 'max-min-win-interval-for-producers',
}

export interface ApiParams extends RequestPattern {
  page?: number;
  size?: number;
  winner?: boolean;
  year?: number;
  projection?: ApiProjection;
}
export interface Movie {
  id: number;
  year: number;
  title: string;
  studios: string[];
  producers: string[];
  winner: boolean;
}

export interface ListSort {
  sorted: boolean;
  unsorted: boolean;
}

export interface ListPageable {
  sort: ListSort;
  pageSize: number;
  pageNumber: number;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface ListResponse {
  content: Movie[];
  pageable: ListPageable;
  totalElements: number;
  last: boolean;
  totalPages: number;
  first: boolean;
  sort: ListSort;
  number: number;
  numberOfElements: number;
  size: number;
}

export interface MultipleWinnerYear {
  year: number;
  winnerCount: number;
}

export interface MultipleWinnersResponse {
  years: MultipleWinnerYear[];
}

export interface Studio {
  name: string;
  winCount: number;
}

export interface WinnerStudiosResponse {
  studios: Studio[];
}

export interface ProducerWinner {
  producer: string;
  interval: number;
  previousWin: number;
  followingWin: number;
}

export interface WinIntervalResponse {
  min: ProducerWinner[];
  max: ProducerWinner[];
}
