import type { MetaFunction } from "@remix-run/cloudflare";
import FeederWidget from "~/components/FeederWidget";

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

      <FeederWidget title="Cricket" />
      <FeederWidget title="Dubia Roach" />
      <FeederWidget title="BSFL" />
      <FeederWidget title="Greater Mealworm" />
    </div>
  );
}
