<script lang="ts">
    import { generateInputId } from "$lib";
    import { getMonitorStats } from "$lib/api/monitors/http";
    import { pb } from "$lib/pocketbase";
    import type { MonitorsResponse } from "$lib/types/pocketbase-types";
    import type { UnsubscribeFunc } from "pocketbase";
    import { onDestroy, onMount } from "svelte";
    import Chart from "../Chart.svelte";

    export let monitor: MonitorsResponse;

    let unsubscribe: UnsubscribeFunc;
    let chartData: number[] = [];

    const getLatency = async () => await (await getMonitorStats( monitor.id )).map(row => row.response_time).reverse();

    onMount( async () => {
        unsubscribe = await pb.collection('monitors').subscribe( monitor.id, async data => {
            monitor = data.record;
            chartData = await getLatency();
        })

        chartData = await getLatency();
    })

    onDestroy( () => {
        if( unsubscribe ) {
            unsubscribe();
        }
    })
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