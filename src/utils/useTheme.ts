import { useCallback, useEffect, useState } from 'react';

export type ThemeSchemeName = 'light' | 'dark' | 'system';

const THEME_STORAGE_NAME = `theme@${location.hostname}`;

export function useTheme() {
  const [currentThemeScheme, setScheme] = useState<ThemeSchemeName>(
    document.documentElement.dataset.theme as ThemeSchemeName,
  );

  const applyThemeScheme = useCallback((scheme: ThemeSchemeName) => {
    const systemScheme = getComputedStyle(document.documentElement)
      .getPropertyValue('--system-scheme')
      .trim();
    switch (scheme) {
      case 'light':
        document.documentElement.dataset.theme = 'light';
        break;

      case 'dark':
        document.documentElement.dataset.theme = 'dark';
        break;

      default:
        document.documentElement.dataset.theme = systemScheme;
        break;
    }
    sessionStorage.setItem(THEME_STORAGE_NAME, scheme);
  }, []);

  const initTheme = useCallback(() => {
    applyThemeScheme(
      (sessionStorage.getItem(THEME_STORAGE_NAME) as ThemeSchemeName) ||
        'system',
    );
  }, [applyThemeScheme]);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setScheme(
        (sessionStorage.getItem(THEME_STORAGE_NAME) as ThemeSchemeName) ||
          'system',
      );
    });
    observer.observe(document.documentElement, {
      attributes: true,
      childList: false,
      subtree: false,
      attributeFilter: ['data-theme'],
    });
    return () => {
      observer.disconnect();
    };
  }, []);

  return { applyThemeScheme, initTheme, currentThemeScheme };
}
