import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { describe, expect, test, vi } from 'vitest';
import { ListPage } from '../src/ListPage';
import mock from './mock.json';

const mockQuery = vi.fn();

vi.mock('@tanstack/react-query', () => ({
  useQuery: (config: object) => mockQuery(config),
}));

const mockToast = vi.fn();

vi.mock('../src/utils', async () => {
  const actual = await vi.importActual('../src/utils');
  return {
    ...actual,
    useToast: () => mockToast,
  };
});

describe('ListPage', () => {
  const user = userEvent.setup();

  test('integration test', async () => {
    mockQuery
      .mockReturnValueOnce({
        isError: true,
        isLoading: false,
        error: { message: 'No network' },
      })
      .mockReturnValueOnce({
        isError: false,
        isLoading: true,
      })
      .mockReturnValueOnce({
        isError: false,
        isLoading: false,
        data: mock.response_list_default,
      })
      .mockReturnValueOnce({
        isError: false,
        isLoading: false,
        data: mock.response_list_filter_year,
      })
      .mockReturnValueOnce({
        isError: false,
        isLoading: false,
        data: mock.response_list_default,
      })
      .mockReturnValueOnce({
        isError: false,
        isLoading: false,
        data: mock.response_list_filter_winner,
      })
      .mockReturnValueOnce({
        isError: false,
        isLoading: false,
        data: mock.response_list_filter_winner_page2,
      })
      .mockReturnValueOnce({
        isError: false,
        isLoading: false,
        data: mock.response_list_filter_winner_page3,
      })
      .mockReturnValueOnce({
        isError: false,
        isLoading: false,
        data: mock.response_list_filter_both,
      });

    const { rerender } = render(<ListPage />);
    await waitFor(() => {
      expect(mockToast).toBeCalled();
    });
    expect(screen.queryByRole('columnheader', { name: 'ID' })).not.toBeNull();
    rerender(<ListPage />);
    expect(screen.getByRole('grid').getAttribute('aria-busy')).toEqual('true');
    expect(screen.queryByRole('status')).not.toBeNull();
    rerender(<ListPage />);
    expect(
      screen.queryByRole('cell', { name: "Can't Stop the Music" }),
    ).not.toBeNull();
    expect(screen.queryByText('Showing 15 of 206 items')).not.toBeNull();
    expect(screen.queryByPlaceholderText('4 digits')).not.toBeNull();
    await user.type(screen.getByPlaceholderText('4 digits'), '1984');
    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: 'Clear' }).hasAttribute('disabled'),
      ).toBeFalsy();
    });
    await user.click(screen.getByRole('button', { name: 'Filter' }));
    await waitFor(() => {
      expect(screen.queryByText('Showing 5 of 5 items')).not.toBeNull();
    });
    await user.click(screen.getByRole('button', { name: 'Clear' }));
    await waitFor(() => {
      expect(
        screen.getByPlaceholderText('4 digits').getAttribute('value'),
      ).toEqual('');
    });
    await user.click(screen.getByRole('button', { name: 'Filter' }));
    await waitFor(() => {
      expect(screen.queryByText('Showing 15 of 206 items')).not.toBeNull();
    });
    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: 'Clear' }).hasAttribute('disabled'),
      ).toBeTruthy;
    });
    expect(
      screen.queryByRole('listbox', { name: 'Filter by winner' }),
    ).not.toBeNull();
    await user.click(screen.getByRole('listbox', { name: 'Filter by winner' }));
    await waitFor(() => {
      expect(
        screen.queryByRole('menuitem', { name: 'Only winner' }),
      ).not.toBeNull();
    });
    await user.click(screen.getByRole('menuitem', { name: 'Only winner' }));
    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: 'Clear' }).hasAttribute('disabled'),
      ).toBeFalsy();
    });
    await user.click(screen.getByRole('button', { name: 'Filter' }));
    await waitFor(() => {
      expect(screen.queryByText('Showing 15 of 42 items')).not.toBeNull();
    });
    expect(
      screen
        .getByRole('button', { name: 'Skip previous' })
        .hasAttribute('disabled'),
    ).toBeTruthy();
    expect(
      screen
        .getByRole('button', { name: 'Skip next' })
        .hasAttribute('disabled'),
    ).toBeFalsy();
    await user.click(screen.getByRole('button', { name: 'Skip next' }));
    await waitFor(() => {
      expect(
        screen
          .getByRole('button', { name: 'Skip previous' })
          .hasAttribute('disabled'),
      ).toBeFalsy();
    });
    expect(
      screen
        .getByRole('button', { name: 'page: 2' })
        .hasAttribute('aria-current'),
    ).toBeTruthy();
    await user.click(screen.getByRole('button', { name: 'page: 3' }));
    await waitFor(() => {
      expect(screen.queryByText('Showing 12 of 42 items')).not.toBeNull();
    });
    expect(
      screen
        .getByRole('button', { name: 'page: 3' })
        .hasAttribute('aria-current'),
    ).toBeTruthy();
    expect(
      screen
        .getByRole('button', { name: 'Skip next' })
        .hasAttribute('disabled'),
    ).toBeTruthy();
    await user.type(screen.getByPlaceholderText('4 digits'), '1984');
    await user.click(screen.getByRole('button', { name: 'Filter' }));
    await waitFor(() => {
      expect(screen.queryByText('Showing 1 of 1 items')).not.toBeNull();
    });
  });
});
