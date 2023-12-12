import clsx from 'clsx';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Icon, Menu, MenuItem, TextField } from './';
import './SelectField.scss';

interface SelectFieldOption {
  label: string;
  value?: string | number;
}

interface SelectFieldProps {
  label?: string;
  options?: Array<SelectFieldOption>;
  onChange?: (value?: string | number, label?: string) => void;
  value?: string | number;
  disabled?: boolean;
  className?: string;
}

export const SelecField = ({
  label,
  options,
  onChange,
  value,
  className,
  disabled,
}: SelectFieldProps) => {
  const [menuIsOpen, openMenu] = useState<boolean>(false);
  const [currentValue, setValue] = useState<string | number>();
  const [anchorMenu, setAnchorMenu] = useState<HTMLDivElement | null>(null);
  const refValue = useRef<string | number | undefined>();

  const menuItems = useMemo((): MenuItem[] => {
    if (!options) {
      return [
        {
          label: 'No options',
          disabled: true,
        },
      ];
    }
    return options.map(option => ({
      label: option.label,
      onClick: () => setValue(option.value),
      isCurrent: currentValue === option.value,
    }));
  }, [currentValue, options]);

  const textFieldValue = useMemo(() => {
    return options?.find(option => option.value === currentValue)?.label;
  }, [options, currentValue]);

  useEffect(() => {
    if (refValue.current !== value) {
      refValue.current = value;
      setValue(value);
    }
  }, [value]);

  useEffect(() => {
    if (refValue.current !== currentValue) {
      refValue.current = currentValue;
      onChange && onChange(currentValue);
    }
  }, [onChange, currentValue]);

  return (
    <div
      className={clsx('SelectField', { 'is-disabled': disabled }, className)}
      onClick={e => {
        setAnchorMenu(e.currentTarget);
        openMenu(true);
      }}
      role="listbox"
      aria-label={label}
    >
      <TextField
        label={label}
        value={textFieldValue || ''}
        endNode={
          <Icon>{menuIsOpen ? 'arrow_drop_up' : 'arrow_drop_down'}</Icon>
        }
        disabled={disabled}
        readOnly
      />
      <Menu
        isOpen={menuIsOpen}
        onClose={() => {
          openMenu(false);
          setTimeout(() => {
            setAnchorMenu(null);
          }, 500);
        }}
        anchor={anchorMenu}
        anchorFullWidth
        items={menuItems}
        aria-label={label ? `Options: ${label}` : undefined}
      />
    </div>
  );
};
