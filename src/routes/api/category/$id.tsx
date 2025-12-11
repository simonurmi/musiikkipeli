import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/category/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/api/category/$id"!</div>;
}
