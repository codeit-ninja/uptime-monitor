import { env } from "$env/dynamic/private";
import { client } from "$lib/directus"
import { refresh } from "@directus/sdk"
import { json, type RequestHandler } from "@sveltejs/kit"

export const POST: RequestHandler = async ( event ) => {
    const authData = JSON.parse( event.cookies.get('directus_auth') as string );
    const response = await client.request(refresh('json', authData.refresh_token ))
    
    /**
     * A refresh token doesn't return a expires_at property
     */
    response.expires_at = new Date( Date.now() + new Date( response.expires as number ).getTime() - 1000 ).getTime()

    console.log(response.expires_at)

    event.cookies.set( 'directus_auth', JSON.stringify( response ), { 
        path: '/',
        httpOnly: env.ENVIRONMENT === 'development' ? false : true,
        expires: new Date( response.expires_at + 10000 )
    } )

    return json(response)
}