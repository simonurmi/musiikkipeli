import HoldButton from "@/components/HoldButton";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import data from "../data/data.json";

export const Route = createFileRoute("/")({ component: App });

function App() {
  const [value, setValue] = useState<number>();

  const getRandomValue = () => {
    setValue(Math.floor(Math.random() * data.length));
  };

  useEffect(() => {
    const category = localStorage.getItem("category");
    if (category) {
      setValue(parseInt(category));
    }
  }, []);

  useEffect(() => {
    if (value) {
      localStorage.setItem("category", String(value));
    }
  }, [value]);

  return (
    <div className="min-h-dvh grid grid-rows-2">
      <div className="flex justify-center items-center text-3xl tracking-wide text-white text-center">
        {value !== undefined ? data[value] : null}
      </div>
      <div className="flex flex-col justify-center items-center">
        <HoldButton onFinish={getRandomValue}>
          {(status) =>
            (() => {
              if (status === "idle") {
                return "🙂";
              }
              if (status === "pending") {
                return "😳";
              }
              if (status === "finished") {
                return "🥳";
              }
            })()
          }
        </HoldButton>
      </div>
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-slate-900 border-t border-slate-500">
        <Link to="/categories">Kategoriat</Link>
      </div>
    </div>
  );
}
