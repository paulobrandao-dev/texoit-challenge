import clsx from 'clsx';
import { HTMLAttributes } from 'react';
import { NavLink } from 'react-router-dom';
import { useMediaQuery } from '../utils';
import { ToolbarActions } from './ToolbarActions';
import { Font, Icon } from './';
import './NavRail.scss';

export const NavRail = ({
  className,
  ...props
}: HTMLAttributes<HTMLElement>) => {
  const media = useMediaQuery();

  return (
    <nav className={clsx('NavRail', className)} {...props}>
      {media.isLargeThenCompact && (
        <div className="logo">
          <img src="/texo-it_icon.png" alt="Texo IT" />
        </div>
      )}
      <NavLink to="/">
        <span className="indicator" role="presentation">
          <Icon>dashboard</Icon>
        </span>
        <Font as="span" format="label-small">
          Dashboard
        </Font>
      </NavLink>
      <NavLink to="/list">
        <span className="indicator" role="presentation">
          <Icon>list</Icon>
        </span>
        <Font as="span" format="label-small">
          List
        </Font>
      </NavLink>
      {media.isLargeThenCompact && <ToolbarActions />}
    </nav>
  );
};
