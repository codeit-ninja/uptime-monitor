<script lang="ts">
    import { getMonitorStats, getLatency } from "$lib/api/monitors/http";
    import { pb } from "$lib/pocketbase";
    import type { MonitorsResponse } from "$lib/types/pocketbase-types";
    import type { UnsubscribeFunc } from "pocketbase";
    import { onDestroy, onMount } from "svelte";

    export let monitor: MonitorsResponse;

    let unsubscribe: UnsubscribeFunc;
    let latency: number;

    onMount( async () => {
        unsubscribe = await pb.collection('monitors').subscribe( monitor.id, async data => {
            monitor = data.record;
            latency = await getLatency( monitor.id );

            console.log(latency)
        })

        const data = await getMonitorStats( monitor.id );
    })

    onDestroy( () => {
        if( unsubscribe ) {
            unsubscribe();
        }
    })
</script>

<div class="row align-items-center g-0">
    <div class="td col-6 fw-semibold">{monitor.name}</div>
    <div class="td col-2 placeholder-glow">
        {#if ! latency}
            <span class="placeholder col-4 rounded"></span>
        {:else}
            <i class="font-monospace">{latency}ms</i>
        {/if}
    </div>
    <div class="td col-2">{monitor.type}</div>
    <div class="td col-2"><span class="indicator indicator-{monitor.online ? 'online' : 'offline'}"></span></div>
</div>