import { useState } from "react";

interface FeederWidgetProps {
  title: string;
  amount?: number;
}

export default function FeederEntry({ title, amount = 0 }: FeederWidgetProps) {
  const [count, setCount] = useState(amount);

  const handleDecrement = () => {
    if (count > 0) setCount(count => --count);
  };

  const handleIncrement = () => {
    setCount(count => ++count);
  };

  return (
    <div>
      <label htmlFor={title} className="text-lg block">
        {title}
      </label>
      <button
        className="rounded bg-gray-400 px-2 py-1"
        onClick={handleDecrement}
        type="button"
      >
        -
      </button>
      <input
        type="number"
        className="w-12 text-center"
        value={count}
        onChange={e => setCount(+e.target.value)}
        onBlur={e => setCount(+e.target.value)}
        min="0"
        name={title}
      />
      <button
        className="rounded bg-gray-400 px-2 py-1"
        onClick={handleIncrement}
        type="button"
      >
        +
      </button>
    </div>
  );
}
