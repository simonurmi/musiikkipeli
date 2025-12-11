import { createFileRoute } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";
import data from "@/data/data.json";

export const Route = createFileRoute("/api/category/")({
  server: {
    handlers: {
      GET: () => json(data),
    },
  },
});
