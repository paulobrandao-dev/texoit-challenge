import { renderHook } from '@testing-library/react';
import { afterAll, afterEach, describe, expect, test, vi } from 'vitest';
import {
  useMovieList,
  useMultipleWinners,
  useWinInterval,
  useWinnerByYear,
  useWinnersStudios,
} from '../src/api';
import mock from './mock.json';

const mockFetch = vi.fn();
globalThis.fetch = mockFetch;

interface MockQuery {
  enabled?: boolean;
  queryKey: Array<string | number | object>;
  queryFn: () => Promise<Record<string, unknown>>;
}

vi.mock('@tanstack/react-query', () => ({
  useQuery: async (options: MockQuery) => {
    if (typeof options.enabled === 'boolean' && !options.enabled) {
      return {
        isError: false,
      };
    }
    try {
      const data = await options.queryFn();
      return {
        isError: false,
        data,
      };
    } catch (error) {
      return {
        isError: true,
        error,
      };
    }
  },
}));

describe('API unity tests', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  test('useMovieList', async () => {
    mockFetch
      .mockReturnValueOnce({
        ok: false,
        status: 400,
      })
      .mockReturnValue({
        ok: true,
        json: async () => mock.response_list_default,
      });
    const { rerender, result, unmount } = renderHook(async () => {
      const render = useMovieList({});
      await new Promise(resolve => {
        setTimeout(resolve);
      });
      return render;
    });
    expect((await result.current).isError).toBeTruthy();
    expect((await result.current).error).toEqual('Missing data or incorrect');
    expect((await result.current).data).toBeUndefined();
    rerender();
    expect((await result.current).isError).toBeFalsy();
    expect((await result.current).data).not.toBeUndefined();
    expect((await result.current).data!.totalElements).toEqual(206);
    unmount();
  });

  test('useMultipleWinners', async () => {
    mockFetch
      .mockReturnValueOnce({
        ok: false,
        status: 500,
      })
      .mockReturnValue({
        ok: true,
        json: async () => mock.response_dash_multiple_winners,
      });
    const { rerender, result, unmount } = renderHook(async () => {
      const render = useMultipleWinners();
      await new Promise(resolve => {
        setTimeout(resolve);
      });
      return render;
    });
    expect((await result.current).isError).toBeTruthy();
    expect((await result.current).error).toEqual(
      'Service temporarily unavailable',
    );
    expect((await result.current).data).toBeUndefined();
    rerender();
    expect((await result.current).isError).toBeFalsy();
    expect((await result.current).data).not.toBeUndefined();
    expect((await result.current).data!.length).toEqual(3);
    unmount();
  });

  test('useWinInterval', async () => {
    mockFetch
      .mockReturnValueOnce({
        ok: false,
        status: 502,
      })
      .mockReturnValue({
        ok: true,
        json: async () => mock.response_dash_winner_interval,
      });
    const { rerender, result, unmount } = renderHook(async () => {
      const render = useWinInterval();
      await new Promise(resolve => {
        setTimeout(resolve);
      });
      return render;
    });
    expect((await result.current).isError).toBeTruthy();
    expect((await result.current).error).toEqual(
      'Service temporarily unavailable',
    );
    expect((await result.current).data).toBeUndefined();
    rerender();
    expect((await result.current).isError).toBeFalsy();
    expect((await result.current).data).not.toBeUndefined();
    expect((await result.current).data!.max[0].interval).toEqual(13);
    expect((await result.current).data!.min[0].interval).toEqual(1);
    unmount();
  });

  test('useWinnersStudios', async () => {
    mockFetch
      .mockReturnValueOnce({
        ok: false,
        status: 503,
      })
      .mockReturnValue({
        ok: true,
        json: async () => mock.response_dash_winners_studios,
      });
    const { rerender, result, unmount } = renderHook(async () => {
      const render = useWinnersStudios();
      await new Promise(resolve => {
        setTimeout(resolve);
      });
      return render;
    });
    expect((await result.current).isError).toBeTruthy();
    expect((await result.current).error).toEqual(
      'Service temporarily unavailable',
    );
    expect((await result.current).data).toBeUndefined();
    rerender();
    expect((await result.current).isError).toBeFalsy();
    expect((await result.current).data).not.toBeUndefined();
    expect((await result.current).data!.length).toEqual(28);
    unmount();
  });

  test('useWinnerByYear', async () => {
    mockFetch.mockImplementation((init: string) => {
      const url = new URLSearchParams(init.split('?')[1]);
      const year = url.get('year');
      switch (year) {
        case '1984':
          return {
            ok: true,
            json: async () => mock.response_dash_winner_by_year_1984,
          };
        case '1986':
          return {
            ok: true,
            json: async () => mock.response_dash_winner_by_year_1986,
          };
        default:
          return {
            ok: false,
            status: 417,
          };
      }
    });
    const { rerender, result, unmount } = renderHook(async (year: number) => {
      const render = useWinnerByYear(year);
      await new Promise(resolve => {
        setTimeout(resolve);
      });
      return render;
    });
    expect((await result.current).isError).toBeFalsy();
    expect((await result.current).data).toBeUndefined();
    rerender(1984);
    expect((await result.current).isError).toBeFalsy();
    expect((await result.current).data).not.toBeUndefined();
    expect((await result.current).data!.length).toEqual(1);
    rerender(1986);
    expect((await result.current).isError).toBeFalsy();
    expect((await result.current).data).not.toBeUndefined();
    expect((await result.current).data!.length).toEqual(2);
    unmount();
  });
});
