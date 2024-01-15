import { Button } from "@nextui-org/react";
import { ActionFunctionArgs } from "@remix-run/cloudflare";
import { Form } from "@remix-run/react";
import { getBrowserClient } from "~/util/supabase";
import { IEnv } from "~/util/types";

export function action({ request }: ActionFunctionArgs) {}

export function clientAction({ context, request }: ActionFunctionArgs) {
  const { supabase, headers } = getBrowserClient(
    request,
    (context.env as IEnv).SUPABASE_PROJECT_URL,
    (context.env as IEnv).SUPABASE_ANON_KEY
  );

  return supabase.auth.signOut();
}

export default function SignOut() {
  return (
    <Form method="post" action="/signout">
      <Button type="submit">Sign Out</Button>
    </Form>
  );
}
