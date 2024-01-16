import type { LinksFunction } from "@remix-run/cloudflare";
import { cssBundleHref } from "@remix-run/css-bundle";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigate
} from "@remix-run/react";
import { Link, NextUIProvider } from "@nextui-org/react";
import tailwindStyles from "./tailwind.css";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Image
} from "@nextui-org/react";
import SignOut from "./routes/signout";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  { rel: "stylesheet", href: tailwindStyles }
];

export default function App() {
  const navigate = useNavigate();

  return (
    <html lang="en" className="light">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="m-2">
        <NextUIProvider navigate={navigate}>
          <Navbar isBordered position="sticky">
            <NavbarBrand className="flex">
              <Image
                className="mb-4"
                height={72}
                width={72}
                src="/reptile-logo.png"
              />
              <h1 className="text-2xl">My Reptile Pal</h1>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
              <NavbarItem>
                <Link href="/">Tracker</Link>
              </NavbarItem>
              <NavbarItem>
                <Link href="/addFeeder">Add Feeder</Link>
              </NavbarItem>
            </NavbarContent>
            <NavbarContent className="flex" justify="end">
              <SignOut />
            </NavbarContent>
          </Navbar>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </NextUIProvider>
      </body>
    </html>
  );
}
