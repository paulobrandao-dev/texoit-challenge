import clsx from 'clsx';
import {
  HTMLAttributes,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Button, Font } from './';
import './Snackbar.scss';

interface ToastProps extends ShowToastEventDetail {
  afterHide: () => void;
}

const Toast = ({ message, duration, action, afterHide }: ToastProps) => {
  const [show, addShow] = useState<boolean>(false);
  const [hide, addHide] = useState<boolean>(false);

  const time = useMemo(() => {
    if (!duration || duration < 4000) return 4000;
    if (duration > 10000) return 10000;
    return duration;
  }, [duration]);

  useEffect(() => {
    setTimeout(() => {
      addShow(true);
    }, 200);
  }, [message]);

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        addHide(true);
      }, 250 + time);
    }
  }, [time, show]);

  useEffect(() => {
    if (hide) {
      setTimeout(() => {
        afterHide();
      }, 200);
    }
  }, [afterHide, hide]);

  return (
    <div className={clsx('Toast', { show, hide })}>
      <Font scale="body" size="medium" role="status">
        {message}
      </Font>
      {action && (
        <Button
          variant="text"
          onClick={() => {
            addHide(true);
            action.callback();
          }}
        >
          {action.label}
        </Button>
      )}
    </div>
  );
};

export interface SnackbarProps extends HTMLAttributes<HTMLElement> {
  bottom?:
    | 'none'
    | 'fab'
    | 'fablarge'
    | 'navbar'
    | 'navbar-fab'
    | 'navbar-fablarge';
}
export const Snackbar = forwardRef<HTMLElement, SnackbarProps>(
  ({ className, bottom, ...props }, ref) => {
    const queue = useRef<ShowToastEventDetail[]>([]);
    const [current, setCurrent] = useState<ShowToastEventDetail>();

    const checkQueue = useCallback(() => {
      if (!current && queue.current.length > 0) {
        const _current = queue.current.shift();
        setCurrent(_current);
      }
    }, [current]);

    const handleShowToast = useCallback(
      (event: CustomEvent<ShowToastEventDetail>) => {
        queue.current.push(event.detail);
        checkQueue();
      },
      [checkQueue],
    );

    const toast = useMemo(() => {
      if (current) {
        return <Toast {...current} afterHide={() => setCurrent(undefined)} />;
      } else {
        return null;
      }
    }, [current]);

    useEffect(() => {
      document.addEventListener('showtoast', handleShowToast);
      return () => {
        document.removeEventListener('showtoast', handleShowToast);
      };
    }, [handleShowToast]);

    useEffect(() => {
      if (!current) {
        checkQueue();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [current]);

    return (
      <aside
        ref={ref}
        className={clsx('Snackbar', `bottom-${bottom || 'none'}`, className)}
        {...props}
      >
        {toast}
      </aside>
    );
  },
);
