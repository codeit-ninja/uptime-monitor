<script lang="ts" type="module">
    import { client } from "$lib/directus";
    import { onDestroy, onMount } from "svelte";
    import { drop } from "lodash-es";
    import Chart from "./Chart.svelte";

    type LatencyProps = {
        monitorId: string;
    }

    let { monitorId } = $props<LatencyProps>()
    let data: number[] = $state([]);
    
    $effect( () => {
        const test = client.subscribe('monitors_stats', {
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

        test.then(async response => {
            for await (const item of response.subscription) {
                if( item.event === 'init' ) {
                    data = item.data.map(row => row.latency).reverse();
                }

                if( item.event === 'create' ) {
                    data = [...drop(data), ...item.data.map(row => row.latency).reverse()]
                }
            }
        })
    })
</script>

<Chart {data} label="Latency" height="60px" />