import { client } from "$lib/directus"

export const createMonitorStatsSubscription = async ( monitorId: string, event: 'create' | 'update' | 'delete' = 'create' ) => {
    const { subscription, unsubscribe } = await client.subscribe('monitors_stats', { 
        query: {
            filter: {
                monitor: {
                    id: {
                        _eq: monitorId
                    }
                }
            },
            sort: 'created_at'
        },
        event
    })

    return {
        subscription,
        unsubscribe
    }
}