import { getAuthenticatedUserSchema } from "./schema/auth.schema"
import { destroyUserToken, getUserToken } from "./session.server"

export const getAuthenticatedUser = async ({ request }: { request: Request }) => {
    const userToken:string | null = await getUserToken({ request })
    if(!userToken) {
        return null
    }
    try{
  
    const response = await fetch(process.env.BACKEND_URL + 'auth', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`
        },
    })
    const data = await response.json()
 
      return getAuthenticatedUserSchema.parse(data)
    } catch (error) {
        console.error(error)
        throw await destroyUserToken({request})
    }
}
