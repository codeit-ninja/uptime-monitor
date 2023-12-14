import { client } from "$lib/directus"

export const monitorStatsSub = async ( monitor: Monitors ) => {
    const { subscription, unsubscribe } = await client.subscribe('monitors_stats', { 
        query: {
            filter: {
                monitor: {
                    id: {
                        _eq: monitor.id
                    }
                }
            },
            sort: 'created_at'
        },
        event: 'create'
    })

    return {
        subscription,
        unsubscribe
    }
}