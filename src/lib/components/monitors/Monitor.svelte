<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import Latency from "$lib/components/charts/Latency.svelte";
    import { client } from "$lib/directus";

    export let monitor: Monitors;
    let unsubscribe: () => void;

    onMount( async () => {
        const subscription = await client.subscribe('monitors', {
            event: 'update',
            query: {
                filter: {
                    id: {
                        _eq: monitor.id
                    }
                },
                deep: {
                    // @ts-expect-error directus does not export *.* as a type
                    monitors_stats: {
                        _sort: '-created_at'
                    }
                },
                // @ts-expect-error directus does not export *.* as a type
                fields: ['*.*']
            }
        })

        unsubscribe = subscription.unsubscribe;

        for await (const item of subscription.subscription) {
            if( item.event === 'update' ) {
                // @ts-expect-error directus does not export *.* as a type
                monitor = item.data[0];

                console.log(item.data)
            }
        }
    })

    onDestroy( () => unsubscribe && unsubscribe())
</script>

<div class="row align-items-center g-0">
    <div class="td col-4 fw-semibold">
        <a href="/_/monitors/{monitor.id}">{monitor.name}</a></div>
    <div class="td col-4 placeholder-glow">
        <Latency monitorId={monitor.id} />
    </div>
    <div class="td col-2 d-flex justify-content-center">{monitor.type}</div>
    <div class="td col-2 d-flex justify-content-center align-items-center column-gap-3">
        <span class="indicator indicator-{monitor.online ? 'online' : 'offline'}"></span>
        <pre class="text-success mb-0">{monitor.monitors_stats[0].response.status_code}</pre>
    </div>
</div>