import type { MetaFunction } from "@remix-run/cloudflare";

export const meta: MetaFunction = () => {
  return [
    { title: "Reptile Feeding Tracker" },
    { name: "description", content: "Reptile Feeding Tracker!" }
  ];
};

export default function Index() {
  return (
    <div>
      <h1 className="text-2xl">Feeding Tracker</h1>
    </div>
  );
}
