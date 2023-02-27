import {createContext, useReducer} from 'react';
import type { ReactNode } from 'react';

export interface StoreProviderProps {
  children: ReactNode;
}

export interface State {
  count: number;
}

export type Action = 
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'reset' };

  export const initialState: State = { count: 0 };

  function reducer(state: State, action: Action): State {
    switch(action.type) {
      case 'increment':
        return { count: state.count + 1 };
      case 'decrement':
        return { count: state.count - 1 };
      case 'reset':
        return { count: 0 };
      default:
        return state;
    }
  }

  export const StoreContext = createContext<{
    state: State;
    dispatch: React.Dispatch<Action>;
  }>({
    state: initialState,
    dispatch: () => undefined,
  });

  export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
      <StoreContext.Provider value={{ state, dispatch }}>
        {children}
      </StoreContext.Provider>
    );
  };
  