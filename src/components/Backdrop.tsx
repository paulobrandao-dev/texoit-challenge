import clsx from 'clsx';
import {
  ReactNode,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import './Backdrop.scss';

interface BackdropProps {
  isOpen: boolean;
  children: ReactNode;
  onClose?: () => void;
  alignX?: 'start' | 'end' | 'center';
  alignY?: 'start' | 'end' | 'center';
  disablePointer?: boolean;
  isTransparent?: boolean;
  restingLevel?: 1 | 2 | 3 | 4 | 5;
}
export const Backdrop = forwardRef<HTMLDivElement, BackdropProps>(
  (
    {
      isOpen,
      onClose,
      disablePointer,
      isTransparent,
      restingLevel,
      children,
      alignX,
      alignY,
    },
    ref,
  ) => {
    const className = useMemo(() => {
      return clsx('Backdrop', {
        [`align-x-${alignX}`]: alignX !== undefined,
        [`align-y-${alignY}`]: alignY !== undefined,
        'disable-pointer': disablePointer,
        'is-transparent': isTransparent,
        [`resting-level-${restingLevel}`]: restingLevel !== undefined,
      });
    }, [alignX, alignY, disablePointer, isTransparent, restingLevel]);

    const handleClick = useCallback(() => {
      onClose && onClose();
    }, [onClose]);

    const backdrop = useRef<HTMLDivElement>(document.createElement('div'));
    backdrop.current.role = 'presentation';
    backdrop.current.className = className;
    backdrop.current.addEventListener('click', handleClick);

    const [isShown, show] = useState<boolean>(false);

    useImperativeHandle(ref, () => backdrop.current);

    useEffect(() => {
      if (isOpen) {
        document.body.appendChild(backdrop.current);
        show(true);
      } else {
        show(false);
      }
    }, [isOpen]);

    useEffect(() => {
      if (isShown) {
        backdrop.current.classList.add('is-open');
      } else {
        backdrop.current.classList.remove('is-open');
        setTimeout(() => {
          backdrop.current.remove();
        }, 300);
      }
    }, [isShown]);

    return createPortal(children, backdrop.current);
  },
);
