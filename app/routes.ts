import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  // Route par défaut qui redirige vers /en
  index("routes/index.tsx"),
  // Route avec paramètre de langue
  route(":lang", "routes/$lang.tsx", [
    index("routes/home.tsx"),
    // autres routes enfants ici
  ]),
] satisfies RouteConfig;
