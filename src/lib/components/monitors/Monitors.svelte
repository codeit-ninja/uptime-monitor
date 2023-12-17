<script lang="ts">
    import { subscribe } from "$lib/realtime/stats";
    import Monitor from "./Monitor.svelte";

    export let monitors: Monitors[]
</script>
<header class="d-flex align-items-center mb-5">
    <div class="page-title">
        <h3 class="mb-0">Monitors</h3>
    </div>
    <div class="ms-auto">
        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal">
            <span class="material-symbols-outlined">
                add
            </span>
            Add new monitor
        </button>
    </div>
</header>

<div class="monitors-table">
    <div class="row g-0">
        <div class="th col-4">Name</div>
        <div class="th col-4">Latency</div>
        <div class="th col-2 d-flex justify-content-center">Type</div>
        <div class="th col-2 d-flex justify-content-center">Status</div>
    </div>
    
    {#each monitors as monitor}
        <Monitor {monitor} />
    {/each}
</div>