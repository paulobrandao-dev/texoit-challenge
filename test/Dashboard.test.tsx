import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { describe, expect, test, vi } from 'vitest';
import { Dashboard } from '../src/Dashboard';
import mock from './mock.json';

const mockWinnerByYear = vi.fn();
const mockWinInterval = vi.fn();
const mockWinnerStudios = vi.fn();
const mockMultipleWinners = vi.fn();

vi.mock('../src/api', () => ({
  useWinnerByYear: (year: number) => mockWinnerByYear(year),
  useWinInterval: () => mockWinInterval(),
  useWinnersStudios: () => mockWinnerStudios(),
  useMultipleWinners: () => mockMultipleWinners(),
}));

const mockToast = vi.fn();

vi.mock('../src/utils', async () => {
  const actual = await vi.importActual('../src/utils');
  return {
    ...actual,
    useToast: () => mockToast,
  };
});

describe('Dashboard', () => {
  const user = userEvent.setup();

  test('integration test', async () => {
    mockWinnerByYear.mockImplementation((year?: number) => {
      switch (year) {
        case 1984:
          return {
            isLoading: false,
            isError: false,
            data: mock.response_dash_winner_by_year_1984,
          };
        case 1986:
          return {
            isLoading: false,
            isError: false,
            data: mock.response_dash_winner_by_year_1986,
          };
        default:
          return {
            isLoading: false,
            isError: false,
          };
      }
    });
    mockWinInterval
      .mockReturnValueOnce({
        isError: true,
        error: 'Mock error',
      })
      .mockReturnValueOnce({
        isError: false,
        isLoading: true,
      })
      .mockReturnValue({
        isError: false,
        isLoading: false,
        data: mock.response_dash_winner_interval,
      });
    mockMultipleWinners
      .mockReturnValueOnce({
        isError: true,
        error: 'Mock error',
      })
      .mockReturnValueOnce({
        isError: false,
        isLoading: true,
      })
      .mockReturnValue({
        isError: false,
        isLoading: false,
        data: mock.response_dash_multiple_winners.years,
      });
    mockWinnerStudios
      .mockReturnValueOnce({
        isError: true,
        error: 'Mock error',
      })
      .mockReturnValueOnce({
        isError: false,
        isLoading: true,
      })
      .mockReturnValue({
        isError: false,
        isLoading: false,
        data: mock.response_dash_winners_studios.studios,
      });
    const { rerender } = render(<Dashboard />);
    await waitFor(() => {
      expect(mockToast).toBeCalledTimes(3);
    });
    rerender(<Dashboard />);
    await waitFor(() => {
      expect(screen.queryAllByRole('status').length).toEqual(3);
    });
    rerender(<Dashboard />);
    expect(
      screen.queryByRole('row', { name: 'Longest interval between wins' }),
    ).not.toBeNull();
    expect(
      screen.queryByRole('row', { name: 'Shortest interval between wins' }),
    ).not.toBeNull();
    expect(
      screen.queryAllByRole('row', { name: 'Year with multiple winner' })
        .length,
    ).toEqual(3);
    expect(
      screen.queryAllByRole('row', { name: 'Studio winner' }).length,
    ).toEqual(3);
    expect(screen.queryByPlaceholderText('Search by year')).not.toBeNull();
    expect(
      screen.queryByRole('button', { name: 'Search movie' }),
    ).not.toBeNull();
    const field = screen.getByPlaceholderText(
      'Search by year',
    ) as HTMLInputElement;
    const futureYear = new Date().getFullYear() + 1;
    await user.type(field, futureYear.toString());
    expect(field.value).toEqual(futureYear.toString());
    await waitFor(() => {
      expect(
        screen
          .getByRole('button', { name: 'Search movie' })
          .hasAttribute('disabled'),
      ).toBeTruthy();
    });
    await user.clear(field);
    await user.type(field, '1984');
    expect(field.value).toEqual('1984');
    await waitFor(() => {
      expect(
        screen
          .getByRole('button', { name: 'Search movie' })
          .hasAttribute('disabled'),
      ).toBeFalsy();
    });
    await user.click(screen.getByRole('button', { name: 'Search movie' }));
    await waitFor(() => {
      expect(
        screen.queryAllByRole('row', { name: 'Movie winner in this year' })
          .length,
      ).toEqual(1);
    });
    expect(
      screen.queryByRole('button', { name: 'Clear serach' }),
    ).not.toBeNull();
    await user.click(screen.getByRole('button', { name: 'Clear serach' }));
    await waitFor(() => {
      expect(field.value).toEqual('');
    });
    await user.type(field, '1986');
    expect(field.value).toEqual('1986');
    await waitFor(() => {
      expect(
        screen
          .getByRole('button', { name: 'Search movie' })
          .hasAttribute('disabled'),
      ).toBeFalsy();
    });
    await user.click(screen.getByRole('button', { name: 'Search movie' }));
    await waitFor(() => {
      expect(
        screen.queryAllByRole('row', { name: 'Movie winner in this year' })
          .length,
      ).toEqual(2);
    });
  });
});
