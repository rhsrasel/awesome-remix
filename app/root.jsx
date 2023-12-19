import MainNav from "./components/MainNav";
import { cssBundleHref } from "@remix-run/css-bundle";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "@remix-run/react";

import Bootstrap from "./styles/bootstrap.min.css";
import Styles from "./styles/main.css";

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <MainNav />
        </header>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export const links = () => [
  ...(cssBundleHref
    ? [{ rel: "stylesheet", href: cssBundleHref }]
    : [
        { rel: "stylesheet", href: Bootstrap },
        { rel: "stylesheet", href: Styles },
      ]),
];

export function ErrorBoundary() {
  const error = useRouteError();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <MainNav />
        </header>
        <main className="container">
          <div className="card bg-danger-subtle">
            <div className="card-body">
              <h2 className="card-title">An error occurred!</h2>
              <h4 className="text-danger">
                {error.status} {error.statusText}
              </h4>
              <p>{error?.data?.message}</p>
              <Link to="/" className="btn btn-primary">
                Back Safety
              </Link>
            </div>
          </div>
        </main>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
