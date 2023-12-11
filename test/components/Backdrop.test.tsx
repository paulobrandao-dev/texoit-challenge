import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { Fragment } from 'react';
import { afterEach, describe, expect, test } from 'vitest';
import { Backdrop, ButtonIcon, Icon } from '../../src/components';
import { StateConsumer, StateProvider } from '../utils';

describe('Backdrop component', () => {
  const user = userEvent.setup({
    pointerEventsCheck: 0,
  });

  afterEach(() => {
    cleanup();
  });

  test('render', async () => {
    render(
      <StateConsumer>
        {({ setState, ...props }) => (
          <Fragment>
            <ButtonIcon
              onClick={() => setState({ isOpen: true })}
              aria-label="Open backdrop"
            >
              <Icon>expand_content</Icon>
            </ButtonIcon>
            <Backdrop
              isOpen={props.isOpen as boolean}
              onClose={() => setState({ isOpen: false })}
            >
              <h1>Test</h1>
            </Backdrop>
          </Fragment>
        )}
      </StateConsumer>,
      {
        wrapper: ({ children }) => (
          <StateProvider initialState={{ isOpen: false }} children={children} />
        ),
      },
    );
    expect(screen.queryByRole('presentation')).toBeNull();
    await user.click(screen.getByRole('button', { name: 'Open backdrop' }));
    expect(screen.queryByRole('presentation')).not.toBeNull();
    await user.click(screen.getByText('Test'));
    await waitFor(() => {
      expect(screen.queryByRole('presentation')).toBeNull();
    });
  });

  test('disablePointer prop', () => {
    render(
      <Backdrop isOpen disablePointer>
        <h1>Test</h1>
      </Backdrop>,
    );
    const backdrop = screen.getByRole('presentation');
    expect(backdrop.className).toEqual('Backdrop disable-pointer is-open');
    backdrop.remove();
  });

  test('isTransparent prop', () => {
    render(
      <Backdrop isOpen isTransparent>
        <h1>Test</h1>
      </Backdrop>,
    );
    const backdrop = screen.getByRole('presentation');
    expect(backdrop.className).toEqual('Backdrop is-transparent is-open');
    backdrop.remove();
  });

  test('restingLevel prop', () => {
    render(
      <Backdrop isOpen restingLevel={2}>
        <h1>Test</h1>
      </Backdrop>,
    );
    const backdrop = screen.getByRole('presentation');
    expect(backdrop.className).toEqual('Backdrop resting-level-2 is-open');
    backdrop.remove();
  });

  test('align props', () => {
    render(
      <Backdrop isOpen alignX="end" alignY="start">
        <h1>Test</h1>
      </Backdrop>,
    );
    const backdrop = screen.getByRole('presentation');
    expect(backdrop.className).toEqual(
      'Backdrop align-x-end align-y-start is-open',
    );
    backdrop.remove();
  });
});
