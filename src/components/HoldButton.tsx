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
    <div className="flex flex-col gap-4">
      <button
        {...longPress}
        className="select-none touch-none text-5xl flex justify-center"
        style={{ width: 200, height: 60 }}
        onContextMenu={(event) => {
          event.preventDefault();
        }}
      >
        {children(status)}
      </button>
      <div className="bg-gray-200 h-2 w-full">
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            background: "dodgerblue",
            transition: "width 0.04s linear",
          }}
        />
      </div>
    </div>
  );
}
