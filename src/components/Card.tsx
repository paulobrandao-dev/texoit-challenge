import clsx from 'clsx';
import { ComponentPropsWithoutRef, ElementType } from 'react';
import './Card.scss';

interface CardProps<T extends ElementType> {
  as?: T;
  variant?: 'outlined' | 'filled' | 'elevated';
}

export const Card = <T extends ElementType>({
  as,
  variant,
  className,
  ...props
}: CardProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof CardProps<T>>) => {
  const ComponentElement = as || 'div';
  return (
    <ComponentElement
      className={clsx('Card', `variant-${variant}`, className)}
      {...props}
    />
  );
};

interface CardContentProps<T extends ElementType> {
  as?: T;
}

export const CardContent = <T extends ElementType>({
  as,
  className,
  ...props
}: CardContentProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof CardContentProps<T>>) => {
  const ComponentElement = as || 'div';
  return (
    <ComponentElement className={clsx('CardContent', className)} {...props} />
  );
};
