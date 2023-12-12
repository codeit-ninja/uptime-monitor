import { authorizeRequest, notAuthorized } from '$lib/server/auth';
import { pb } from '$lib/pocketbase';
import type { Handle } from '@sveltejs/kit';
import { account } from '$lib/appwrite';

export const handle: Handle = async ({ event, resolve }) => {
    // event.locals.auth = await authorizeRequest( event );


    try {
        console.log(await account.get())
    } catch(e) {

    }

    console.log(event.cookies.getAll())
    
    const response = await resolve(event)

    // if( event.url.pathname.startsWith('/api') ) {
    //     // API requests need to be authorized
    //     if( ! event.locals.auth ) {
    //         return notAuthorized()
    //     }

    //     // Refresh auth cookie
    //     response.headers.set(
    //         'set-cookie',
    //         pb.authStore.exportToCookie({ httpOnly: false })
    //     )
    // }

    // if( event.url.pathname.startsWith('/_') ) {

    //     // Requests to dashboard need to be authorized
    //     if( ! event.locals.auth ) {
    //         throw redirect(303, '/auth/login')
    //     }
    // }

    return response;
}