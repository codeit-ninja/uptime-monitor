import { redirect, type Handle } from '@sveltejs/kit';
import { client } from '$lib/directus';
import { refresh } from '@directus/sdk/rest';
import { env } from '$env/dynamic/private';

export const auth: Handle = async ({ event, resolve }) => {
    if( event.url.pathname.startsWith('/api/auth') || event.url.pathname.startsWith('/auth') ) {
        const response = await resolve(event)

        return response;
    }

    event.locals.auth = event.cookies.get('directus_auth') && JSON.parse( event.cookies.get('directus_auth') as string )
    
    refreshtoken: if( event.locals.auth ) {
        /**
         * Set current access token so we can use the API on the server side
         */
        client.setToken( event.locals.auth.access_token );

        /**
         * If token didnt expire, break out of if statement
         */
        if( event.locals.auth.expires_at - new Date().getTime() > 100000 ) {
            break refreshtoken;
        }

        // @ts-ignore
        event.locals.auth = await client.request(refresh('json', event.locals.auth.refresh_token));

        event.cookies.set('directus_auth', JSON.stringify( event.locals.auth ), {
            path: '/',
            expires: new Date(event.locals.auth.expires_at as number),
            httpOnly: env.ENVIRONMENT === 'development' ? false : true
        })
    }
    
    if( event.url.pathname.startsWith('/_') ) {

        // Requests to dashboard need to be authenticated
        if( ! event.locals.auth && env.ENVIRONMENT !== 'development' ) {
            throw redirect(301, '/auth/login')
        }
    }

    if( env.ENVIRONMENT === 'development' && ! event.locals.auth ) {
        try {
            // @ts-ignore
            event.locals.auth = await client.login('richard@codeit.ninja', 'Creative12!@');

            event.cookies.set('directus_auth', JSON.stringify( event.locals.auth ), {
                path: '/',
                expires: new Date(event.locals.auth.expires_at as number),
                httpOnly: env.ENVIRONMENT === 'development' ? false : true
            })
        } catch(_) {
            throw redirect(301, '/auth/login');
        }
    }

    const response = await resolve(event)

    return response;
}