<script lang="ts">
    import { page } from '$app/stores'; 
    import Latency from '$lib/components/charts/Latency.svelte';
    import { client } from '$lib/directus';
    import { createMonitorSubscription } from '$lib/subscriptions/monitor';
    import { onMount } from 'svelte';

    onMount( async () => {
        const { subscription, unsubscribe } = await createMonitorSubscription( $page.params.id, 'update' );

        for await( const monitor of subscription ) {
            console.log(monitor)
        }
    })
</script>
<div class="container">
    <header class="page-title">
        <h1>Mauritzschilderwerken.nl</h1>
    </header>
    <div class="row row-gap-4">
        <div class="col-12 col-sm-4">
            <Latency monitorId={$page.params.id} height="auto" />
        </div>
        <div class="col-12 col-sm-4">
            <div class="widget widget-dark">
                <span class="d-flex align-items-center gap-3">
                    <span class="indicator indicator-online"></span>
                    <span>Online</span>
                </span>
                <span class="badge">Status</span>
            </div>
        </div>
        <div class="col-12 col-sm-4">
            <div class="widget widget-dark">
                <span class="text text-warning">251</span>
                <span class="badge">Average latency</span>
            </div>
        </div>
    </div>
</div>

<div class="container mt-5">
    <div class="monitors-table">
        <div class="row g-0">
            <div class="th col-4">Latency</div>
            <div class="th col-4">Response</div>
            <div class="th col-4">Status</div>
        </div>
        <div class="row g-0">
            <div class="td col-4">251</div>
            <div class="td col-4">{ JSON.stringify({ "status_code": 200 }) }</div>
            <div class="td col-4"><span class="indicator indicator-online"></span></div>
        </div>
    </div>
</div>