import { cleanup, render, screen } from '@testing-library/react';
import React from 'react';
import { afterEach, describe, expect, test } from 'vitest';
import { Button, Icon } from '../../src/components';

describe('Button component', () => {
  afterEach(() => {
    cleanup();
  });

  test('render', () => {
    render(<Button>Test</Button>);
    const button = screen.getByRole('button', { name: 'Test' });
    expect(button.className).toEqual('Button variant-filled');
  });

  describe('variant prop', () => {
    afterEach(() => {
      cleanup();
    });

    test('variant text', () => {
      render(<Button variant="text">Test</Button>);
      const button = screen.getByRole('button', { name: 'Test' });
      expect(button.className).toEqual('Button variant-text');
    });

    test('variant outlined', () => {
      render(<Button variant="outlined">Test</Button>);
      const button = screen.getByRole('button', { name: 'Test' });
      expect(button.className).toEqual('Button variant-outlined');
    });

    test('variant tonal', () => {
      render(<Button variant="tonal">Test</Button>);
      const button = screen.getByRole('button', { name: 'Test' });
      expect(button.className).toEqual('Button variant-tonal');
    });

    test('variant filled', () => {
      render(<Button variant="filled">Test</Button>);
      const button = screen.getByRole('button', { name: 'Test' });
      expect(button.className).toEqual('Button variant-filled');
    });

    test('variant elevated', () => {
      render(<Button variant="elevated">Test</Button>);
      const button = screen.getByRole('button', { name: 'Test' });
      expect(button.className).toEqual('Button variant-elevated');
    });
  });

  test('icon prop', () => {
    render(<Button icon={<Icon aria-hidden="true">done</Icon>}>Test</Button>);
    const button = screen.getByRole('button', { name: 'Test' });
    expect(button.childElementCount).toEqual(2);
    expect(button.firstElementChild?.className).toEqual(
      'material-symbols-outlined size-24',
    );
  });
});
