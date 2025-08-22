import { createCookieSessionStorage, redirect } from "react-router";


const {getSession, commitSession, destroySession} = createCookieSessionStorage({
    cookie: {
        name: "__session",
       secrets: ['s3cret1'],
    },
});
export const getUserToken = async ({ request }: { request: Request }) => {
    const session = await getSession(request.headers.get("Cookie"));
    return session.get("token");
}
 
export const commitUserToken = async ({ request, token }: { request: Request, token: string }) => {
    const session = await getSession(request.headers.get("Cookie"));
    session.set("token", token);
    return commitSession(session);
}

export const destroyUserToken = async ({ request }: { request: Request }) => {
    const session = await getSession(request.headers.get("Cookie"));
    const destroyedSession = await destroySession(session);
    return redirect('/', {
        headers: {
            'Set-Cookie': destroyedSession
        }
    })
}