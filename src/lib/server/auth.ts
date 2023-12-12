import { json, type RequestEvent } from "@sveltejs/kit";
import { pb } from "../pocketbase";
import type { UsersResponse } from "$lib/types/pocketbase-types";

/**
 * Authorizes a request server side
 * 
 * @param event 
 */
export const authorizeRequest = async ( event: RequestEvent ) => {
    pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '')

    // Refresh the token after each authorization request
    if( pb.authStore.isValid ) {
        await pb.collection('users').authRefresh()
    }

    return pb.authStore.model as UsersResponse;
}

export const notAuthorized = () => {
    const data = {
        code: 401,
        message: 'Not authorized'
    }
    return json( data, { status: 401 } );
}