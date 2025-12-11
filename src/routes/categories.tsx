import { createFileRoute, Link } from "@tanstack/react-router";
import data from "@/data/data.json";

export const Route = createFileRoute("/categories")({
  component: Categories,
});

function Categories() {
  return (
    <div className="pb-14">
      <div className="p-8">
        <ul className="flex flex-col gap-1 list-disc text-slate-500 list-inside">
          {data
            .toSorted((a, b) => a.localeCompare(b))
            .map((category) => (
              <li key={category.toLocaleLowerCase()}>
                <span className="text-white">{category}</span>
              </li>
            ))}
        </ul>
      </div>
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-slate-900 border-t border-slate-500">
        <Link to="/">Takaisin</Link>
      </div>
    </div>
  );
}
