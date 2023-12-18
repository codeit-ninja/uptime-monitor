<script lang="ts" type="module">
    import { client } from "$lib/directus";
    import { onDestroy, onMount } from "svelte";
    import { drop } from "lodash-es";
    import Chart from "./Chart.svelte";

    export let monitorId: string;
    export let height = '60px';

    let data: number[] = [];
    let unsubscribe: () => void;

    onMount( async () => {
        const subscription = await client.subscribe('monitors_stats', {
            query: {
                filter: { 
                    monitor: { 
                        id: { 
                            _eq: monitorId 
                        }
                    }
                },
                fields: ['latency'],
                sort: '-created_at'
            }
        })

        unsubscribe = subscription.unsubscribe;

        for await (const item of subscription.subscription) {
            if( item.event === 'init' ) {
                data = item.data.map(row => row.latency).reverse();
            }

            if( item.event === 'create' ) {
                data = [...drop(data), ...item.data.map(row => row.latency).reverse()]
            }
        }
    })

    onDestroy(() => unsubscribe && unsubscribe())
</script>

<Chart {data} label="Latency" {height} />