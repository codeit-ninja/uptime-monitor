<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import Chart from "../Chart.svelte";
    import type { MonitorsStatsSubscription } from "$lib/realtime/stats";
    import { writable } from "svelte/store";

    export let monitor: Monitors;
    export let subscribe: MonitorsStatsSubscription;

    let stop = writable<() => void>();

    // let subscriptions: (() => void)[] = [];
    // let destroy: () => void;
    let chartData: number[] = monitor.monitors_stats.map(row => row.latency).reverse();

    onMount( async () => {
        if( subscribe ) {
            const { events, unsubscribe } = await subscribe( monitor );
            $stop = unsubscribe;

            events.on('create', ({  }) => {})
        }
    })

    onDestroy( () => $stop && $stop())
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