// components/Counter.tsx

import { useGlobalState } from "../hooks/useCounter";

const Counter: React.FC = () => {
  const { count, increment, decrement, reset } = useGlobalState();

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-2xl font-medium text-white">Counter</h2>
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
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        onClick={reset}
      >
        Reset
      </button>
    </div>
  );
};

export default Counter;
