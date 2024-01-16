import { type ActionFunctionArgs } from "@remix-run/node";
import { json, useFetcher } from "@remix-run/react";
import { Image } from "@nextui-org/react";
import { getServerClient } from "~/util/supabase";
import { IEnv } from "~/util/types";

export async function action({ request, context }: ActionFunctionArgs) {
  const formData = await request.formData();

  const { supabase, headers } = getServerClient(request, context);

  const { data, error } = await supabase.auth.signUp({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: {
      emailRedirectTo: (context.env as IEnv).AUTH_REDIRECT_URI
    }
  });

  if (error) {
    return json({ error, status: "ERROR" } as const, {
      headers
    });
  }

  return json({ data, status: "OK" } as const, {
    headers
  });
}

export default function SignUp() {
  const fetcher = useFetcher<typeof action>();

  if (fetcher.data && fetcher.data.status === "OK") {
    return (
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Welcome to Reptile Feeder!
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <p className="mt-10 text-center text-sm text-gray-500">
              You are now signed up! Please check your email for a confirmation
              link.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (fetcher.data && fetcher.data.status === "ERROR") {
    return (
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Error signing up
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <p className="mt-10 text-center text-sm text-gray-500">
              {fetcher.data.error.message}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center py-4 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Image
            className="mx-auto"
            width="256"
            height="256"
            src="/reptile-logo.png"
          />
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create an account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <fetcher.Form className="space-y-6" method="POST">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600
                  disabled:opacity-50"
                  disabled={fetcher.state === "submitting"}
                >
                  Sign Up
                </button>
              </div>
            </fetcher.Form>
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            Have an account?{" "}
            <a
              href="/signin"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
