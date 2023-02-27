import { useContext } from 'react';
import { CountdownContext } from '~/context/countdown';

export function useCountdown() {
  const { state, dispatch } = useContext<React.ContextType<typeof CountdownContext>>(CountdownContext);

  function startCountdown() {
    dispatch({ type: 'start' });
    dispatch({ type: 'setCount', count: state.count });
  }

  function pauseCountdown() {
    dispatch({ type: 'pause' });
  }

  function resetCountdown() {
    dispatch({ type: 'reset' });
  }

  return {
    timeRemaining: state.timeRemaining,
    isRunning: state.isRunning,
    startCountdown,
    pauseCountdown,
    resetCountdown,
    dispatch
  };
}
