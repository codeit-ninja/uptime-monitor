import { refresh, type AuthenticationData } from "@directus/sdk";
import { client } from "$lib/directus";
import { POST } from "$lib/http";
import { get, writable } from "svelte/store";

let interval: NodeJS.Timeout;

const runRefreshTokenInterval = () => {
    if( interval ) {
        clearInterval( interval )
    }

    interval = setInterval(refreshToken, 1000)
}

export const refreshToken = async () => {
    const auth = get( authStore );

    if( new Date(auth.expires_at as number).getTime() - new Date().getTime() <= 100000 ) {
        authStore.set( await client.request( refresh('json', auth.refresh_token as string) ) )
    }
}

export const createAuthStore = () => {
    const { set, subscribe } = writable<AuthenticationData>();

    return {
        set: ( token: AuthenticationData ) => {
            set( token )
            runRefreshTokenInterval()
            
            console.log(token)
            client.setToken( token.access_token )
            client.connect()
        },
        subscribe
    }
}

export const authStore = createAuthStore();