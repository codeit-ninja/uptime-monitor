<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import Chart from "../Chart.svelte";
    import { client } from "$lib/directus";
    import { readItem } from '@directus/sdk/rest'
    import { monitorStatsSub } from "$lib/subscriptions/monitorStats";
    import { subscribeTo } from "$lib/realtime";

    export let monitor: Monitors;

    let destroy: () => void;
    let chartData: number[] = monitor.monitors_stats.map(row => row.latency).reverse();

    onMount( async () => {
        const statsSubscription = await subscribeTo( { 
            collection: 'monitors_stats',
            event: 'create',
            query: {
                filter: {
                    monitor: {
                        id: {
                            _eq: monitor.id
                        }
                    }
                }
            }
        } )

        statsSubscription.on('create', response => chartData = [...chartData, ...response.data.map(row => row.latency)])
    })

    onDestroy( () => destroy && destroy())
</script>

<a class="row align-items-center g-0" href="/_/monitors/{monitor.id}">
    <div class="td col-4 fw-semibold">{monitor.name}</div>
    <div class="td col-4 placeholder-glow">
        <Chart bind:data={chartData} />
    </div>
    <div class="td col-2 d-flex justify-content-center">{monitor.type}</div>
    <div class="td col-2 d-flex justify-content-center align-items-center column-gap-3">
        <span class="indicator indicator-{monitor.online ? 'online' : 'offline'}"></span>
        <pre class="text-success mb-0">200</pre>
    </div>
</a>