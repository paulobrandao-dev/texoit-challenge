import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { afterEach, describe, expect, test } from 'vitest';
import { ButtonIcon, Icon } from '../../src/components';
import { StateConsumer, StateProvider } from '../utils';

describe('ButtonIcon component', () => {
  const user = userEvent.setup({ pointerEventsCheck: 0 });

  afterEach(() => {
    cleanup();
  });

  test('render', () => {
    render(
      <ButtonIcon aria-label="Open menu">
        <Icon>menu</Icon>
      </ButtonIcon>,
    );
    const button = screen.queryByRole('button', { name: 'Open menu' });
    expect(button).not.toBeNull();
    expect(button?.className).toEqual('ButtonIcon variant-standard');
    expect(button?.firstElementChild?.className).toEqual(
      'material-symbols-outlined size-24',
    );
  });

  test('isToggleable', async () => {
    render(
      <StateConsumer>
        {({ setState, ...props }) => (
          <ButtonIcon
            variant="standard"
            aria-label="Bookmark"
            onClick={() => setState({ checked: !props.checked as boolean })}
            isChecked={props.checked as boolean}
            isToggleable
          >
            <Icon>bookmark</Icon>
          </ButtonIcon>
        )}
      </StateConsumer>,
      {
        wrapper: ({ children }) => (
          <StateProvider
            initialState={{ checked: false }}
            children={children}
          />
        ),
      },
    );
    const button = screen.getByRole('switch', { name: 'Bookmark' });
    expect(button.getAttribute('aria-checked')).toEqual('false');
    await user.click(button);
    expect(button.getAttribute('aria-checked')).toEqual('true');
    await user.click(button);
    expect(button.getAttribute('aria-checked')).toEqual('false');
  });
});
