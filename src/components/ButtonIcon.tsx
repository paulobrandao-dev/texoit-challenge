import clsx from 'clsx';
import { ButtonHTMLAttributes, forwardRef } from 'react';
import './ButtonIcon.scss';

interface ButtonIconProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'standard' | 'outlined' | 'tonal' | 'filled';
  isToggleable?: boolean;
  isChecked?: boolean;
}

export const ButtonIcon = forwardRef<HTMLButtonElement, ButtonIconProps>(
  (
    { variant = 'standard', isChecked, isToggleable, className, ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={clsx('ButtonIcon', `variant-${variant}`, className)}
        role={isToggleable ? 'switch' : undefined}
        aria-checked={isChecked}
        {...props}
      />
    );
  },
);
