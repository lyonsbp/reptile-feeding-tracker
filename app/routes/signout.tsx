import { Button } from "@nextui-org/react";
import { ActionFunctionArgs, json } from "@remix-run/cloudflare";
import { ClientActionFunctionArgs, Form, redirect } from "@remix-run/react";
import { getBrowserClient, getServerClient } from "~/util/supabase";
import { IEnv } from "~/util/types";

export async function action({ request, context }: ActionFunctionArgs) {
  const { supabase, headers } = getServerClient(request, context);
  const { error } = await supabase.auth.signOut();

  return json(
    {
      supabaseProjectUrl: (context.env as IEnv).SUPABASE_PROJECT_URL,
      supabaseAnonKey: (context.env as IEnv).SUPABASE_ANON_KEY,
      error
    },
    { headers }
  );
}

export async function clientAction({
  request,
  serverAction
}: ClientActionFunctionArgs) {
  const { supabaseProjectUrl, supabaseAnonKey, error } = await serverAction<
    typeof action
  >();
  const { supabase, headers } = getBrowserClient(
    request,
    supabaseProjectUrl,
    supabaseAnonKey
  );

  await supabase.auth.signOut();

  return redirect("/signin", { headers });
}

export default function SignOut() {
  return (
    <Form method="post" action="/signout">
      <Button type="submit">Sign Out</Button>
    </Form>
  );
}
