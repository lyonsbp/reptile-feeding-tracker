import {
  redirect,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  type MetaFunction
} from "@remix-run/cloudflare";
import { getServerClient } from "~/util/supabase";
import FeederWidget from "~/views/FeederWidget";
import SignOut from "./signout";

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

export async function loader({ request, context }: LoaderFunctionArgs) {
  const { supabase, headers } = getServerClient(request, context);

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/signin", { headers });
  }
  return user;
}

export default function Index() {
  return (
    <div>
      <SignOut />
      <h1 className="text-2xl">Feeding Tracker</h1>

      <FeederWidget />
    </div>
  );
}
