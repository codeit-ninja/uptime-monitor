import { useTry, useTryAsync } from "$lib/helpers";
import { pb } from "$lib/pocketbase";
import type { HttpMonitorsResponse, MonitorsRecord, MonitorsResponse, UsersResponse } from "$lib/types/pocketbase-types";

export type HttpMonitorData = {
    name: string;
    interval: number;
    timeout: number;
    url: string;
    method: string;
}

/**
 * Gets current logged in users monitors
 * If record does not exist, will create one
 * 
 * @param user 
 * @returns 
 */
export const getMonitors = async ( { id }: UsersResponse, filter?: string ) => {
    if( filter ) {
        filter = ` && ${filter}`
    }

    return await pb.collection('monitors').getList(1, 25, { filter: `user.id="${id}"${filter ? filter : ''}`, sort: 'online' })
}

export const getList = async ( user: UsersResponse, filter?: string ) => {
    if( filter ) {
        filter = ` && ${filter}`
    }

    return await pb.collection( 'monitors' ).getList(1, 25, {
        filter: `user.id="${user.id}"${filter ? filter : ''}`
    })
}

const create = async ( { name, interval, url, method, timeout }: HttpMonitorData, { id }: UsersResponse ) => {
    const http = {
        method,
        url,
        timeout
    }

    return pb.collection('http_monitors').create( http ).then( async record => {
        const monitor = {
            user: id,
            name,
            interval,
            type: 'HTTP',
            monitorId: record.id
        }

        return await pb.collection('monitors').create( monitor )
    })
}

export const createMonitor = async ( data: HttpMonitorData, user: UsersResponse ) => {
    return create( data, user ).then(r => r).catch(e => e);
}