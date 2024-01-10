import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction
} from "@remix-run/cloudflare";
import FeederWidget from "~/views/FeederWidget";

export const meta: MetaFunction = () => {
  return [
    { title: "Reptile Feeding Tracker" },
    { name: "description", content: "Reptile Feeding Tracker!" }
  ];
};

export async function action({ request }: ActionFunctionArgs) {
  const data = await request.formData();

  return data;
}

export async function clientAction({ request }: ActionFunctionArgs) {
  const data = await request.formData();

  window.localStorage.setItem(
    "feederData",
    JSON.stringify(Object.fromEntries(data.entries()))
  );

  return data;
}

export async function loader({ request }: LoaderFunctionArgs) {}

export async function clientLoader({ request }: LoaderFunctionArgs) {
  const data = window.localStorage.getItem("feederData");

  // console.log(data);

  return (data && JSON.parse(data)) || {};
}

export default function Index() {
  return (
    <div>
      <h1 className="text-2xl">Feeding Tracker</h1>

      <FeederWidget />
    </div>
  );
}
