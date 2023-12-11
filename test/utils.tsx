import React from 'react';

const reducer = (
  state: Record<string, unknown>,
  changes: Partial<Record<string, unknown>>,
) => ({
  ...state,
  ...changes,
});

interface StateWrapperContextValue extends Record<string, unknown> {
  setState: (value: Record<string, unknown>) => void;
}

const StateWrapperContext = React.createContext<StateWrapperContextValue>({
  setState: () => {},
});

interface StateProviderProps {
  initialState: Record<string, unknown>;
  children: React.ReactNode;
}

export const StateProvider = ({
  initialState,
  children,
}: StateProviderProps) => {
  const [state, setState] = React.useReducer(reducer, initialState);

  return (
    <StateWrapperContext.Provider value={{ ...state, setState }}>
      {children}
    </StateWrapperContext.Provider>
  );
};

interface StateConsumerProps {
  children: (props: StateWrapperContextValue) => React.ReactNode;
}

export const StateConsumer = ({ children }: StateConsumerProps) => (
  <StateWrapperContext.Consumer>{children}</StateWrapperContext.Consumer>
);
