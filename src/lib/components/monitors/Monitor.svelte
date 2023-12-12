<script lang="ts">
    import { pb } from "$lib/pocketbase";
    import type { MonitorsResponse } from "$lib/types/pocketbase-types";
    import type { UnsubscribeFunc } from "pocketbase";
    import { onDestroy, onMount } from "svelte";

    export let monitor: MonitorsResponse;

    let unsubscribe: UnsubscribeFunc;

    onMount( async () => {
        unsubscribe = await pb.collection('monitors').subscribe( monitor.id, data => {
            monitor = data.record;
        })
    })

    onDestroy( () => {
        if( unsubscribe ) {
            unsubscribe();
        }
    })
</script>

<div class="row g-0">
    <div class="td col-6 fw-semibold">{monitor.name}</div>
    <div class="td col-3">{monitor.type}</div>
    <div class="td col-3"><span class="indicator indicator-{monitor.online ? 'online' : 'offline'}"></span></div>
</div>