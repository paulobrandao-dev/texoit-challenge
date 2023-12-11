import { useRef, useState } from 'react';
import { useTheme } from '../utils';
import { ButtonIcon, Icon, Menu } from './';
import './ToolbarActions.scss';

export function ToolbarActions() {
  const theme = useTheme();
  const anchorMenu = useRef<HTMLButtonElement>(null);
  const [menuIsOpen, openMenu] = useState<boolean>(false);

  return (
    <div className="ToolbarActions" role="toolbar">
      <ButtonIcon
        variant="outlined"
        onClick={() => {
          window.open('https://github.com', '_blank');
        }}
        aria-label="Go to GitHub repo"
      >
        <Icon>code</Icon>
      </ButtonIcon>
      <ButtonIcon
        ref={anchorMenu}
        variant="outlined"
        onClick={() => openMenu(true)}
        aria-label="Open theme selector"
        aria-haspopup="menu"
        aria-expanded={menuIsOpen ? 'true' : 'false'}
        aria-controls="theme-selector"
      >
        <Icon>palette</Icon>
      </ButtonIcon>
      <Menu
        id="theme-selector"
        aria-label="Theme options"
        isOpen={menuIsOpen}
        onClose={() => openMenu(false)}
        anchor={anchorMenu.current}
        items={[
          {
            label: 'System',
            onClick: () => theme.applyThemeScheme('system'),
            startNode: <Icon>settings</Icon>,
            isCurrent: theme.currentThemeScheme === 'system',
          },
          {
            label: 'Light',
            onClick: () => theme.applyThemeScheme('light'),
            startNode: <Icon>light_mode</Icon>,
            isCurrent: theme.currentThemeScheme === 'light',
          },
          {
            label: 'Dark',
            onClick: () => theme.applyThemeScheme('dark'),
            startNode: <Icon>dark_mode</Icon>,
            isCurrent: theme.currentThemeScheme === 'dark',
          },
        ]}
      />
    </div>
  );
}
