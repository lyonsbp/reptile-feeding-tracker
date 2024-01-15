import { getTodayAsDateValue } from "~/util/date";
import FeederEntry from "~/components/FeederEntry";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/cloudflare";

export async function loader({ context, request }: LoaderFunctionArgs) {}

export async function action({ context, request }: ActionFunctionArgs) {}

export default function FeederWidget() {
  const fetcher = useFetcher();
  const data = useLoaderData();

  return (
    <fetcher.Form method="post">
      <span>Date: </span>
      <input name="date" type="date" defaultValue={getTodayAsDateValue()} />

      <h2 className="text-xl">Feeders</h2>
      <FeederEntry title="Cricket" amount={data?.Cricket || 0} />
      <FeederEntry title="Dubia Roach" amount={data?.["Dubia Roach"] || 0} />
      <FeederEntry title="BSFL" amount={data?.BSFL || 0} />
      <FeederEntry
        title="Greater Mealworm"
        amount={data?.["Greater Mealworm"] || 0}
      />

      <button type="submit" className="rounded bg-gray-400 px-2 py-1 my-2">
        Submit
      </button>
    </fetcher.Form>
  );
}
