import clsx from 'clsx';
import { HTMLAttributes, useMemo } from 'react';
import { ButtonIcon, Font, Icon } from './';
import './Paginator.scss';

interface PaginatorProps extends HTMLAttributes<HTMLElement> {
  pageSize: number;
  totalItems: number;
  totalPages: number;
  currentPage: number;
  currentItemsCount: number;
  onChangePage: (page: number) => void;
}

interface PageButtonProps {
  page: number;
  onClick: (page: number) => void;
  active?: boolean;
}

const PageButton = ({ page, onClick, active }: PageButtonProps) => {
  return (
    <ButtonIcon
      variant={active ? 'filled' : 'standard'}
      disabled={active}
      aria-current={active ? 'page' : undefined}
      aria-label={`page: ${page + 1}`}
      onClick={() => {
        if (!active) {
          onClick(page);
        }
      }}
    >
      <Font as="span" format="body-medium">
        {page + 1}
      </Font>
    </ButtonIcon>
  );
};

export const Paginator = ({
  pageSize,
  totalItems,
  totalPages,
  currentPage,
  currentItemsCount,
  onChangePage,
  className,
  ...props
}: PaginatorProps) => {
  const pagesBetween = useMemo(() => {
    const candidates: number[] = [];
    let counter = 0;
    while (counter < totalPages) {
      candidates.push(counter);
      counter++;
    }
    candidates.shift();
    candidates.pop();
    let shallow = candidates;
    if (totalPages <= 7) {
      return candidates;
    }
    const current = candidates.findIndex(item => item === currentPage);
    if (currentPage > 3) {
      shallow = candidates.slice(
        current > -1 && totalPages - currentPage > 5
          ? current - 1
          : totalPages - 6,
      );
    }
    if (totalPages - currentPage > 5) {
      shallow = shallow.slice(0, currentPage <= 3 ? 4 : 3);
    }
    return shallow;
  }, [currentPage, totalPages]);

  return (
    <footer className={clsx('Paginator', className)} {...props}>
      <Font as="span" format="label-large">
        Showing {pageSize > currentItemsCount ? currentItemsCount : pageSize} of{' '}
        {totalItems} items
      </Font>
      <div className="pages">
        <ButtonIcon
          onClick={() => onChangePage(currentPage - 1)}
          disabled={currentPage === 0}
          aria-label="Skip previous"
        >
          <Icon aria-hidden="true">skip_previous</Icon>
        </ButtonIcon>
        <PageButton
          page={0}
          onClick={onChangePage}
          active={currentPage === 0}
        />
        {totalPages > 7 && currentPage > 3 && (
          <Font as="span" format="body-medium" className="ellipsis">
            ...
          </Font>
        )}
        {pagesBetween.map(page => (
          <PageButton
            key={page}
            page={page}
            onClick={onChangePage}
            active={page === currentPage}
          />
        ))}
        {totalPages > 7 && totalPages - currentPage > 5 && (
          <Font as="span" format="body-medium" className="ellipsis">
            ...
          </Font>
        )}
        {totalPages > 1 && (
          <PageButton
            page={totalPages - 1}
            onClick={onChangePage}
            active={currentPage === totalPages - 1}
          />
        )}
        <ButtonIcon
          onClick={() => onChangePage(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
          aria-label="Skip next"
        >
          <Icon aria-hidden="true">skip_next</Icon>
        </ButtonIcon>
      </div>
    </footer>
  );
};
