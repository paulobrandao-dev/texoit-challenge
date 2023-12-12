import clsx from 'clsx';
import { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react';
import './Button.scss';
import { Font } from '.';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'text' | 'outlined' | 'tonal' | 'filled' | 'elevated';
  icon?: ReactNode;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = 'filled', icon, fullWidth, children, className, ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={clsx(
          'Button',
          `variant-${variant}`,
          { 'with-icon': icon, 'full-width': fullWidth },
          className,
        )}
        {...props}
      >
        {icon}
        <Font as="span" format="label-large">
          {children}
        </Font>
      </button>
    );
  },
);
