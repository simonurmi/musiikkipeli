import { cva } from "class-variance-authority";
import { ReactNode, useRef, useState } from "react";
import useLongPress, { LongPressStatus } from "../hooks/useLongPress";

interface Props {
  children: (status: LongPressStatus) => ReactNode;
  onStart?: () => void;
  onCancel?: () => void;
  onFinish?: () => void;
}

export default function HoldButton({ children, onFinish }: Props) {
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const { status, ...longPress } = useLongPress({
    delay: 1500,
    onStart: () => {
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }
      let p = 0;
      intervalRef.current = setInterval(() => {
        p += 3;
        setProgress(Math.min(p, 100));
      }, 45);
    },
    onFinish: () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      setProgress(0);
      onFinish?.();
    },
    onCancel: () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      setProgress(0);
    },
  });

  return (
    <div className="flex flex-col">
      <button
        {...longPress}
        onContextMenu={(event) => {
          event.preventDefault();
        }}
        className={cva(
          "select-none touch-none text-5xl flex justify-center py-6 w-60",
          {
            variants: {
              status: {
                idle: "bg-slate-800",
                pending: "bg-slate-700",
                finished: "",
              },
            },
          },
        )({ status })}
      >
        {children(status)}
      </button>
      <div className="bg-gray-200 h-2 w-full">
        <div
          className="h-full bg-blue-500 transition-[width] duration-75 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
