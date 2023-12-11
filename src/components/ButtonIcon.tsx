import clsx from 'clsx';
import { ButtonHTMLAttributes, forwardRef } from 'react';
import './ButtonIcon.scss';

interface ButtonIconProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'standard' | 'outlined' | 'tonal' | 'filled';
}

export const ButtonIcon = forwardRef<HTMLButtonElement, ButtonIconProps>(
  ({ variant = 'standard', className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx('ButtonIcon', `variant-${variant}`, className)}
        {...props}
      />
    );
  },
);
