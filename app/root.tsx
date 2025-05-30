import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData
} from "react-router";

import React from "react";
import { I18nextProvider } from "react-i18next";
import type { LoaderFunctionArgs } from "react-router";
import type { Route } from "./+types/root";
import "./app.css";
import { Navbar } from "./components/Navbar";
import type { User } from "./components/UserContext";
import { UserProvider } from "./components/UserContext";
import i18n from "./lib/i18n";

/**
 * Loader Remix/React Router pour charger l'utilisateur depuis le backend
 * Récupère le token dans les cookies, appelle le backend, et renvoie l'utilisateur (ou null)
 */
export async function loader({ request }: LoaderFunctionArgs) {
  const cookie = request.headers.get("cookie") || "";
  const match = cookie.match(/auth_token=([^;]+)/);
  let user: User | null = null;
  if (match) {
    try {
      const res = await fetch("https://backendurl/auth/me", {
        headers: { "Authorization": `Bearer ${match[1]}` },
      });
      if (res.ok) {
        user = (await res.json()) as User;
      }
    } catch {
      user = null;
    }
  }
  return { user };
}

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

// Layout simplifié pour React Router v7 (pas de Meta, Links, Scripts, ScrollRestoration)
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

/**
 * Point d'entrée principal de l'app
 * Fournit le UserProvider avec l'utilisateur du loader
 */
export default function App() {
  const { user } = useLoaderData() as { user: User | null };

  return (
    <I18nextProvider i18n={i18n}>
      <UserProvider initialUser={user}>
        <Navbar />
        <Outlet />
      </UserProvider>
    </I18nextProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
