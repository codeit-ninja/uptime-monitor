import { authorizeRequest, notAuthorized } from '$lib/server/auth';
import { pb } from '$lib/pocketbase';
import { type Handle, redirect } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    event.locals.auth = await authorizeRequest( event );

    const response = await resolve(event)

    if( event.url.pathname.startsWith('/api') ) {
        // API requests need to be authorized
        if( ! event.locals.auth ) {
            return notAuthorized()
        }

        // Refresh auth cookie
        response.headers.set(
            'set-cookie',
            pb.authStore.exportToCookie({ httpOnly: false })
        )
    }

    if( event.url.pathname.startsWith('/_') ) {

        // Requests to dashboard need to be authorized
        if( ! event.locals.auth ) {
            throw redirect(303, '/auth/login')
        }
    }

    return response;
}