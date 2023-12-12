import { Reducer } from 'react';
import { ApiParams } from '../api/types';

type ListPageReducer = Reducer<ApiParams, ApiParams>;

export const INITIAL_VALUES: ApiParams = {
  page: 0,
  size: 15,
};

export const listPageReducer: ListPageReducer = (state, changes) => ({
  ...state,
  ...changes,
});
