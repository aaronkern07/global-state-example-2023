import React, { useEffect } from 'react';
import { useCountdown } from '~/hooks/useCountdown';
import { useGlobalState } from '~/hooks/useCounter';

export default function Countdown() {
  const { timeRemaining, isRunning, startCountdown, pauseCountdown, resetCountdown, dispatch } = useCountdown();
  const { count, increment, decrement } = useGlobalState();

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        dispatch({ type: 'tick' });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeRemaining, count, dispatch]);

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-2xl font-medium text-white">Countdown</h2>
      <p className="text-2xl font-bold text-white">{timeRemaining}</p>
      <div className="flex flex-row items-center justify-center gap-4">
        <button
          className="px-4 py-2 bg-gray-200 text-black rounded-lg shadow-md"
          onClick={startCountdown}
        >
          Start
        </button>
        <button
          className="px-4 py-2 bg-gray-200 text-black rounded-lg shadow-md"
          onClick={pauseCountdown}
        >
          Pause
        </button>
        <button
          className="px-4 py-2 bg-gray-200 text-black rounded-lg shadow-md"
          onClick={resetCountdown}
        >
          Reset to Counter
        </button>
      </div>
      <div className="flex flex-row items-center justify-center gap-4">
        <button
          className="px-4 py-2 bg-gray-200 text-black rounded-lg shadow-md"
          onClick={decrement}
        >
          -
        </button>
        <p className="text-2xl font-bold text-white">{count}</p>
        <button
          className="px-4 py-2 bg-gray-200 text-black rounded-lg shadow-md"
          onClick={increment}
        >
          +
        </button>
      </div>
    </div>
  );
}
