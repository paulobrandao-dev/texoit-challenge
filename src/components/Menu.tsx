import clsx from 'clsx';
import { CSSProperties, HTMLAttributes, ReactNode, useMemo } from 'react';
import { useMediaQuery } from '../utils';
import { Backdrop, Font } from './';
import './Menu.scss';

export interface MenuItem {
  label: string;
  onClick?: () => void;
  startNode?: ReactNode;
  endNode?: ReactNode;
  isCurrent?: boolean;
  disabled?: boolean;
}

interface MenuProps extends HTMLAttributes<HTMLMenuElement> {
  isOpen: boolean;
  onClose: () => void;
  anchor: HTMLElement | null;
  items: Array<MenuItem>;
  anchorOriginX?: 'left' | 'right';
  anchorFullWidth?: boolean;
}
export const Menu = ({
  isOpen,
  onClose,
  items,
  anchor,
  anchorOriginX,
  anchorFullWidth,
  className,
  ...props
}: MenuProps) => {
  const media = useMediaQuery();

  const positions = useMemo((): CSSProperties | undefined => {
    if (!anchor) return undefined;
    const coords = anchor.getBoundingClientRect();
    const screenHeightHalf = media.height / 2;
    const screenWidthHalf = media.width / 2;
    const isTop = coords.bottom < screenHeightHalf;
    const isLeft = anchorOriginX
      ? anchorOriginX === 'left'
      : coords.right < screenWidthHalf;
    const top = isTop ? coords.bottom : undefined;
    const bottom = !isTop ? Math.round(media.height - coords.top) : undefined;
    const left = isLeft ? coords.left : undefined;
    const right = !isLeft ? Math.round(media.width - coords.right) : undefined;
    const transformOriginHorizontalSide = isLeft ? 'left' : 'right';
    const transformOrigin = `${isTop ? 'top' : 'bottom'} ${
      anchorFullWidth ? 'center' : transformOriginHorizontalSide
    }`;
    const width = anchorFullWidth ? coords.width : undefined;
    return { top, bottom, left, right, transformOrigin, width };
  }, [anchor, anchorFullWidth, anchorOriginX, media.height, media.width]);

  return (
    <Backdrop
      isOpen={isOpen}
      onClose={() => onClose()}
      restingLevel={2}
      isTransparent
    >
      <menu
        onClick={e => e.stopPropagation()}
        className={clsx(
          'Menu',
          { 'is-open': isOpen, 'anchor-width': anchorFullWidth },
          className,
        )}
        style={positions}
        {...props}
      >
        {items.map(item => (
          <li key={item.label} role="presentation">
            <button
              type="button"
              onClick={() => {
                item.onClick && item.onClick();
                onClose();
              }}
              role="menuitem"
              aria-current={item.isCurrent}
              disabled={item.disabled}
            >
              {item.startNode && (
                <span className="side-node">{item.startNode}</span>
              )}
              <Font as="span" format="label-large" className="label">
                {item.label}
              </Font>
              {item.endNode && (
                <span className="side-node">{item.endNode}</span>
              )}
            </button>
          </li>
        ))}
      </menu>
    </Backdrop>
  );
};
