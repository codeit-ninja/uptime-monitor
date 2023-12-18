// @ts-nocheck
import { client } from '$lib/directus';
import { aggregate, readItem } from '@directus/sdk';
import type { PageServerLoad } from './$types';
import { DateTime } from "luxon";
import { first } from 'lodash-es'

export const load: PageServerLoad = async ( { params } ) => {
    // const monitor = await client.request(
    //     readItem('monitors', params.id, {
    //         fields: ['*', { monitors_stats: ['*'] }]
    //     })
    // )

    // const stats = first( await client.request(
    //     aggregate('monitors_stats', { 
    //         aggregate: { avg: 'latency' },
    //         query: {
    //             filter: {
    //                 monitor: {
    //                     _eq: params.id
    //                 }
    //             }
    //         }
    //     })
    // ))

    // const monthly = await client.request(
    //     aggregate('monitors_stats', {
    //         aggregate: { count: 'status' },
    //         query: {
    //             filter: {
    //                 monitor: {
    //                     _eq: params.id
    //                 },
    //                 created_at: {
    //                     _between: [ DateTime.now().startOf('month').toISO(), DateTime.now().endOf('month').toISO() ]
    //                 },
    //                 status: {
    //                     _eq: 'OFFLINE'
    //                 }
    //             }
    //         }
    //     })
    // )

    return {
        
    }
}