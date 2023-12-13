import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { AppBar, NavRail, Snackbar } from './components';
import { useMediaQuery, useTheme } from './utils';

export function Layout() {
  const media = useMediaQuery();
  const theme = useTheme();

  useEffect(() => {
    theme.initTheme();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <NavRail />
      <main>
        <Outlet />
      </main>
      {media.isCompactScreen && <AppBar />}
      <Snackbar />
    </>
  );
}
