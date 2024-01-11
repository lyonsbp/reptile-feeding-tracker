import { type ActionFunctionArgs } from "@remix-run/node";
import { Form, json } from "@remix-run/react";
import { createServerClient, parse, serialize } from "@supabase/ssr";

export async function action({ request, context }: ActionFunctionArgs) {
  const cookies = parse(request.headers.get("Cookie") ?? "");
  const headers = new Headers();
  const formData = await request.formData();

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

  const { data, error } = await supabase.auth.signUp({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: {
      emailRedirectTo: context.env.AUTH_REDIRECT_URI
    }
  });

  if (error) {
    return new Response(JSON.stringify(error), {
      headers
    });
  }

  return new Response(JSON.stringify(data), {
    headers
  });
}

export default function signup() {
  return (
    <Form method="post">
      <label htmlFor="email">Email</label>
      <input type="email" name="email" id="email" />

      <label htmlFor="password">Password</label>
      <input type="password" name="password" id="password" />
      <button type="submit">Submit</button>
    </Form>
  );
}
