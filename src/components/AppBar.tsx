import clsx from 'clsx';
import {
  HTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { ToolbarActions } from './ToolbarActions';
import { Font } from './';
import './AppBar.scss';

export const AppBar = ({
  className,
  ...props
}: HTMLAttributes<HTMLElement>) => {
  const [isScrolled, setScrolled] = useState<boolean>(false);
  const mainContainer = useRef<HTMLElement>(document.querySelector('main'));

  const handleScroll = useCallback(() => {
    if (!mainContainer.current) return;
    setScrolled(mainContainer.current.scrollTop > 0);
  }, []);

  useEffect(() => {
    const main = mainContainer.current;
    main?.addEventListener('scroll', handleScroll);
    return () => {
      main?.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <header
      className={clsx('AppBar', { 'is-scrolled': isScrolled }, className)}
      {...props}
      aria-label="app bar"
    >
      <div className="logo">
        <img src="/texo-it_icon.png" alt="Texo IT" />
      </div>
      <Font as="h1" format="title-large">
        Frontend Challenge
      </Font>
      <ToolbarActions />
    </header>
  );
};
