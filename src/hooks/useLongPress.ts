import { PointerEvent, useCallback, useRef, useState } from "react";

export type LongPressStatus = "idle" | "pending" | "finished";

interface Props {
  onStart?: (event: PointerEvent) => void;
  onFinish?: (event: PointerEvent) => void;
  onCancel?: (event: PointerEvent) => void;
  delay?: number;
}

export default function useLongPress({
  onStart,
  onFinish,
  onCancel,
  delay = 600,
}: Props) {
  const [status, setStatus] = useState<LongPressStatus>("idle");
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const resetStatusRef = useRef<NodeJS.Timeout | null>(null);
  const pressed = useRef(false);

  const start = useCallback(
    (event: PointerEvent) => {
      pressed.current = true;
      setStatus("pending");
      onStart?.(event);

      timerRef.current = setTimeout(() => {
        if (pressed.current) {
          setStatus("finished");
          onFinish?.(event);

          resetStatusRef.current = setTimeout(() => {
            setStatus("idle");
          }, 1500);
        }
      }, delay);
    },
    [onStart, onFinish, delay],
  );

  const clear = useCallback(
    (event: PointerEvent) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      if (pressed.current) {
        onCancel?.(event);
      }
      pressed.current = false;
    },
    [onCancel],
  );

  return {
    status,
    onPointerDown: start,
    onPointerUp: clear,
    onPointerLeave: clear,
  };
}
