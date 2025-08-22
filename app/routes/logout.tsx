import { destroyUserToken } from "~/session.server";
import type { Route } from "./+types/logout";

export const loader = async ({ request }: Route.LoaderArgs) => {
    return await destroyUserToken({ request });
};