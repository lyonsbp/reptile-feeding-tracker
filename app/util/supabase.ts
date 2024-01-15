import { AppLoadContext } from "@remix-run/cloudflare";
import {
  createBrowserClient,
  createServerClient,
  parse,
  serialize
} from "@supabase/ssr";
import { IEnv } from "./types";

export function getServerClient(request: Request, context: AppLoadContext) {
  const cookies = parse(request.headers.get("Cookie") ?? "");
  const headers = new Headers();

  const supabaseUrl = (context.env as IEnv).SUPABASE_PROJECT_URL;
  const supabaseKey = (context.env as IEnv).SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_KEY");
  }
  const supabase = createServerClient(supabaseUrl, supabaseKey, {
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
  });

  return { supabase, headers };
}

export function getBrowserClient(
  request: Request,
  supabaseProjectUrl: string,
  supabaseAnonKey: string
) {
  const cookies = parse(request.headers.get("Cookie") ?? "");
  const headers = new Headers();

  if (!supabaseProjectUrl || !supabaseAnonKey) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_KEY");
  }
  const supabase = createBrowserClient(supabaseProjectUrl, supabaseAnonKey, {
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
  });

  return { supabase, headers };
}
