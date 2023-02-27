import React, { createContext, useReducer } from 'react';
import type { ReactNode } from 'react';
import { useGlobalState } from '~/hooks/useCounter';

export interface CountdownProviderProps {
  children: ReactNode;
}

export interface CountdownState {
  timeRemaining: number;
  isRunning: boolean;
  count: number;
  isPaused: boolean;
}

export type CountdownAction =
  | { type: 'start' }
  | { type: 'stop' }
  | { type: 'reset', count: number, timeRemaining: number }
  | { type: 'tick' }
  | { type: 'pause' }
  | { type: 'setCount', count: number };

export const initialCountdownState: CountdownState = {
  timeRemaining: 60,
  isRunning: false,
  count: 0,
  isPaused: false,
};

export const countdownReducer = (state: CountdownState, action: CountdownAction): CountdownState => {
  switch (action.type) {
    case 'start':
      return { ...state, isRunning: true };
    case 'stop':
      return { ...state, isRunning: false };
    case 'pause':
      return { ...state, isRunning: false, isPaused: true };
    case 'reset':
      return { ...state, isRunning: false, isPaused: false, timeRemaining: state.count };
    case 'tick':
      return { ...state, timeRemaining: state.timeRemaining - 1 };
    case 'setCount':
      if(state.isPaused) {
        console.log('Is paused');
        return { ...state, count: action.count };
      } else {
        console.log('Is not paused');
        return { ...state, count: action.count, timeRemaining: action.count };
      }
    default:
      return state;
  }
};

export const CountdownContext = createContext<{
  state: CountdownState;
  dispatch: React.Dispatch<CountdownAction>;
}>({
  state: initialCountdownState,
  dispatch: () => undefined,
});

export const CountdownProvider: React.FC<CountdownProviderProps> = ({ children }) => {
  const { count } = useGlobalState();
  const [state, dispatch] = useReducer(countdownReducer, initialCountdownState);

  React.useEffect(() => {
    dispatch({ type: 'setCount', count });
  }, [count]);

  return (
    <CountdownContext.Provider value={{ state, dispatch }}>
      {children}
    </CountdownContext.Provider>
  );
};
