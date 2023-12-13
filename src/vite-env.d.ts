/// <reference types="vite/client" />

interface ShowToastEventDetailAction {
  label: string;
  callback: () => void;
}

interface ShowToastEventDetail {
  message: string;
  duration?: number;
  action?: ShowToastEventDetailAction;
}

interface GlobalEventHandlersEventMap {
  showtoast: CustomEvent<ShowToastEventDetail>;
}
