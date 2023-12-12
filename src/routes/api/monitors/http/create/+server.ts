import { pb } from "$lib/pocketbase";
import { json, type RequestEvent, type RequestHandler } from "@sveltejs/kit"
import { schema } from '$lib/schemas/HttpMonitorSchema';
import {  createMonitor } from "$lib/api/monitors/http";

export const GET: RequestHandler = async () => {
    return json('Hi :)');
}

export const POST: RequestHandler = async ( { request, locals }: RequestEvent ) => {
    const data = await request.json();
    const isValid = await schema.validate( data );

    if( ! isValid ) {
        const options: ResponseInit = {
            status: 400
        }

        return json( schema.errors, options );
    }

    const monitor = await createMonitor( data, locals.auth )

    return json(monitor)
}