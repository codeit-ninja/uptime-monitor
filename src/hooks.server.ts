import { pb } from '$lib/database'
import { redirect, type Handle, json } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
    pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '')

    try {
        // get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
        if (pb.authStore.isValid) {
            await pb.collection('users').authRefresh()
        }
    } catch (_) {
        // clear the auth store on failed refresh
        pb.authStore.clear()
    }

    const response = await resolve(event)

    // send back the default 'pb_auth' cookie to the client with the latest store state
    response.headers.set(
        'set-cookie',
        pb.authStore.exportToCookie({ httpOnly: false })
    )

    if( ! pb.authStore.isValid && event.route.id?.startsWith('/api') ) {
        return json('You must login before accessing the API.', { status: 401, statusText: 'You must login before accessing the API.' })
    }
    
    // Needs to be authenticated before accessing application
    if( ! pb.authStore.isValid && event.route.id !== '/auth/login' ) {
        throw redirect(307, '/auth/login')
    }

    return response;
}