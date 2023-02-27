import { useContext } from 'react';
import { StoreContext} from '~/context/counter';

export function useGlobalState() {
  const { state, dispatch } = useContext(StoreContext);
  function increment() {
    dispatch({ type: 'increment' });
  }
  function decrement() {
    dispatch({ type: 'decrement' });
  }
  function reset() {
    dispatch({ type: 'reset' });
  }
  return {count: state.count, increment, decrement, reset};
}

