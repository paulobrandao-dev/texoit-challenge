import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Window as HappyWindow } from 'happy-dom';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { Layout } from '../src/Layout';
import { useToast } from '../src/utils';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');

  const Outlet = () => {
    const toast = useToast();

    return (
      <article>
        <button
          onClick={() => {
            toast({ message: 'Test toast message' });
          }}
        >
          Show toast
        </button>
      </article>
    );
  };

  return {
    ...actual,
    Outlet,
  };
});

describe('Layout', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    window.localStorage.setItem('theme@localhost', 'light');
  });

  afterEach(() => {
    cleanup();
  });

  test('theme change', async () => {
    render(<Layout />, { wrapper: MemoryRouter });
    expect(document.documentElement.dataset.theme).toEqual('light');
    expect(
      screen.queryByRole('button', { name: 'Go to GitHub repo' }),
    ).not.toBeNull();
    expect(
      screen.queryByRole('button', { name: 'Open theme selector' }),
    ).not.toBeNull();
    await user.click(
      screen.getByRole('button', { name: 'Open theme selector' }),
    );
    await waitFor(() => {
      expect(
        screen
          .getByRole('button', { name: 'Open theme selector' })
          .getAttribute('aria-expanded'),
      ).toEqual('true');
    });
    expect(
      screen.queryByRole('list', { name: 'Theme options' }),
    ).not.toBeNull();
    expect(screen.queryByRole('menuitem', { name: 'Dark' })).not.toBeNull();
    await user.click(screen.getByRole('menuitem', { name: 'Dark' }));
    await waitFor(() => {
      expect(document.documentElement.dataset.theme).toEqual('dark');
    });
  });

  test('Show toast', async () => {
    render(<Layout />, { wrapper: MemoryRouter });
    expect(
      screen.queryByRole('complementary', { name: 'Snackbar' }),
    ).not.toBeNull();
    expect(screen.queryByRole('button', { name: 'Show toast' })).not.toBeNull();
    await user.click(screen.getByRole('button', { name: 'Show toast' }));
    await waitFor(() => {
      expect(screen.queryByText('Test toast message')).not.toBeNull();
    });
  });

  test('responsivity', async () => {
    render(<Layout />, { wrapper: MemoryRouter });
    expect(screen.queryByRole('banner', { name: 'app bar' })).toBeNull();
    expect(
      screen.queryByRole('heading', { name: 'Frontend Challenge' }),
    ).toBeNull();
    (window as unknown as HappyWindow).happyDOM.setWindowSize({
      width: 360,
      height: 640,
    });
    await waitFor(() => {
      expect(screen.queryByRole('banner', { name: 'app bar' })).not.toBeNull();
    });
  });
});
