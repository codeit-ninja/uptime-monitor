import { client } from "$lib/directus"

export const createMonitorSubscription = async ( monitorId: string, event: 'create' | 'update' | 'delete' = 'create' ) => {
    const { subscription, unsubscribe } = await client.subscribe('monitors', { 
        query: {
            filter: {
                id: {
                    _eq: monitorId
                }
            }
        },
        event
    })

    return {
        subscription,
        unsubscribe
    }
}