import type { Handle } from "@sveltejs/kit";

export const auth: Handle = async ({ event, resolve }) => {
    return await resolve(event);
}