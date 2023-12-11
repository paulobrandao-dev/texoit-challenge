import clsx from 'clsx';
import { HTMLAttributes } from 'react';
import './Icon.scss';

interface IconProps extends HTMLAttributes<HTMLSpanElement> {
  size?: 20 | 24 | 40 | 48;
}

export const Icon = ({ size = 24, className, ...props }: IconProps) => {
  return (
    <span
      className={clsx('material-symbols-outlined', `size-${size}`, className)}
      {...props}
    />
  );
};
