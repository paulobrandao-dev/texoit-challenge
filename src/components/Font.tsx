import clsx from 'clsx';
import { ComponentPropsWithoutRef, ElementType } from 'react';
import './Font.scss';

interface FontProps<T extends ElementType> {
  as?: T;
  format?:
    | 'display-large'
    | 'display-medium'
    | 'display-small'
    | 'headline-large'
    | 'headline-medium'
    | 'headline-small'
    | 'title-large'
    | 'title-medium'
    | 'title-small'
    | 'body-large'
    | 'body-medium'
    | 'body-small'
    | 'label-large'
    | 'label-medium'
    | 'label-small';
}

export const Font = <T extends ElementType>({
  as,
  format = 'body-large',
  className,
  ...props
}: FontProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof FontProps<T>>) => {
  const ComponentElement = as || 'p';
  return (
    <ComponentElement
      className={clsx('Font', `format-${format}`, className)}
      {...props}
    />
  );
};
