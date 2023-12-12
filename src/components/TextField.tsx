import clsx from 'clsx';
import {
  InputHTMLAttributes,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import './TextField.scss';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  endNode?: ReactNode;
}

export const TextField = ({
  label,
  endNode,
  className,
  ...props
}: TextFieldProps) => {
  const [isPopulated, setPopulated] = useState<boolean>(false);
  const self = useRef<HTMLInputElement>(null);

  const handlePopulate = (e: Event) => {
    const target = e.target as HTMLInputElement;
    setPopulated(target.value.length > 0);
  };

  useEffect(() => {
    const input = self.current;
    input?.addEventListener('change', handlePopulate);
    return () => {
      input?.removeEventListener('change', handlePopulate);
    };
  }, []);

  useEffect(() => {
    if (typeof props.value === 'string') {
      setPopulated(props.value.length > 0);
    } else {
      setPopulated(props.value !== undefined);
    }
  }, [props.value]);

  return (
    <div
      className={clsx(
        'TextField',
        { 'is-populated': isPopulated, 'is-disabled': props.disabled },
        className,
      )}
    >
      {label && <label htmlFor={props.id}>{label}</label>}
      <input ref={self} {...props} />
      {endNode}
    </div>
  );
};
