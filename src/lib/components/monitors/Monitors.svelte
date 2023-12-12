<script lang="ts">
    import type { MonitorsResponse } from "$lib/types/pocketbase-types";
    import Monitor from "./Monitor.svelte";

    export let monitors: MonitorsResponse[]
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
            Create monitor
        </button>
    </div>
</header>

<div class="monitors-table">
    <div class="row g-0">
        <div class="th col-6">Name</div>
        <div class="th col-3">Type</div>
        <div class="th col-3">Status</div>
    </div>
    
    {#each monitors as monitor}
        <Monitor {monitor} />
    {/each}
</div>