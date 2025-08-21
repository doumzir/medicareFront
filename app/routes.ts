import { type RouteConfig, index, prefix, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('register', 'routes/register.tsx'),
  ...prefix('/dashboard', [
    route('index', 'routes/dashboard/index.tsx'),
    route('other', 'routes/dashboard/other.tsx'),
  ]),
] satisfies RouteConfig;
