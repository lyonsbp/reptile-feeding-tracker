import { redirect, type LoaderFunctionArgs } from "@remix-run/cloudflare";
import { type EmailOtpType } from "@supabase/supabase-js";
import { getServerClient } from "~/util/supabase";

export async function loader({ request, context }: LoaderFunctionArgs) {
  const requestUrl = new URL(request.url);
  const token_hash = requestUrl.searchParams.get("token_hash");
  const type = requestUrl.searchParams.get("type") as EmailOtpType | null;
  const next = requestUrl.searchParams.get("next") || "/";

  const { supabase, headers } = getServerClient(request, context);

  if (token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash
    });

    if (!error) {
      return redirect(next, { headers });
    }
  }

  // return the user to an error page with instructions
  return redirect("/auth/auth-code-error", { headers });
}
