import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import data from "../../data.json";
import { useState } from "react";

export const Route = createFileRoute("/")({ component: App });

function App() {
  const [value, setValue] = useState<number>();

  const getRandomValue = () => {
    setValue(Math.floor(Math.random() * data.length));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="flex-grow flex justify-center items-center text-3xl tracking-wide text-white">
        {value !== undefined ? data[value] : null}
      </div>
      <div className="flex-grow flex justify-center items-center">
        <Button onClick={getRandomValue} size="lg" variant="outline">
          Click
        </Button>
      </div>
    </div>
  );
}
