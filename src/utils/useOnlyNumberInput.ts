import { useCallback } from 'react';

export function useOnlyNumberInput() {
  return useCallback((value: string, maxLength?: number) => {
    const clear = value.replace(/[^\d]/g, '');
    if (!maxLength) return clear;
    return clear.substring(0, maxLength);
  }, []);
}
