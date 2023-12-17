<script lang="ts">
    import Modal from "$lib/components/Modal.svelte";
    import type { PageData } from "./$types";
    import Monitors from "$lib/components/monitors/Monitors.svelte";

    let data: PageData;
</script>

<div class="container">

    <!-- <div class="mb-5 mt-3">
        <div class="row row-gap-4">
            <div class="col-12">
                <h3 class="mb-4">Overview</h3>
            </div>
            <div class="col-12 col-sm-4">
                <CountWidget count={$useMonitorStore.monitorsCount} title="Monitors" />
            </div>
            <div class="col-12 col-sm-4">
                <CountWidget count={$useMonitorStore.offlineCount} color="danger" title="Offline" />
            </div>
            <div class="col-12 col-sm-4">
                <CountWidget count={$useMonitorStore.onlineCount} color="success" title="Online" />
            </div>
        </div>
    </div> -->

    <Monitors monitors={data.monitors} />
</div>

<Modal />
