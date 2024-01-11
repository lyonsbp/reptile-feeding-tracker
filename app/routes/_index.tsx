import {
  redirect,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  type MetaFunction
} from "@remix-run/cloudflare";
import { createServerClient, parse, serialize } from "@supabase/ssr";
import FeederWidget from "~/views/FeederWidget";

export const meta: MetaFunction = () => {
  return [
    { title: "Reptile Feeding Tracker" },
    { name: "description", content: "Reptile Feeding Tracker!" }
  ];
};

export async function action({ context, request }: ActionFunctionArgs) {
  const data = await request.formData();

  console.log(context.env);
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

export async function loader({ request, context }: LoaderFunctionArgs) {
  const cookies = parse(request.headers.get("Cookie") ?? "");
  const headers = new Headers();

  const supabase = createServerClient(
    context.env.SUPABASE_PROJECT_URL!,
    context.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(key) {
          return cookies[key];
        },
        set(key, value, options) {
          headers.append("Set-Cookie", serialize(key, value, options));
        },
        remove(key, options) {
          headers.append("Set-Cookie", serialize(key, "", options));
        }
      }
    }
  );

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login", { headers });
  }
  return null;
}

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
