import { useState } from "react";

interface FeederWidgetProps {
  title: string;
  amount?: number;
}

export default function FeederWidget({ title, amount = 0 }: FeederWidgetProps) {
  const [count, setCount] = useState(amount);

  return (
    <div>
      <h2 className="text-lg">{title}</h2>
      <button
        className="rounded bg-gray-200 px-2 py-1"
        onClick={() => setCount(count => --count)}
      >
        -
      </button>
      {count}
      <button
        className="rounded bg-gray-200 px-2 py-1"
        onClick={() => setCount(count => ++count)}
      >
        +
      </button>
    </div>
  );
}
