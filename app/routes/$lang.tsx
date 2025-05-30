import { useEffect } from "react";
import type { LoaderFunctionArgs } from "react-router";
import { Outlet, useLoaderData } from "react-router";
import i18n, { supportedLngs } from "../lib/i18n";

export async function loader({ params }: LoaderFunctionArgs) {
  const { lang } = params;
  
  if (!lang || !supportedLngs.includes(lang as any)) {
    throw new Response("Not Found", { status: 404 });
  }

  // Changer la langue active côté serveur
  i18n.changeLanguage(lang);
  
  return { lang };
}

export default function LangLayout() {
  const { lang } = useLoaderData() as { lang: string };
  
  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);

  return <Outlet />;
} 