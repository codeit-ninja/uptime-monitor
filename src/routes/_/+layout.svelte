<script lang="ts">
    import { getList } from "$lib/api/monitors/http";
    import { pb } from "$lib/pocketbase";
    import { updateCounts } from "$lib/stores/monitors";
    import { user } from "$lib/stores/user";
    import type { UnsubscribeFunc } from "pocketbase";
    import { onDestroy, onMount } from "svelte";

    let unsubscribe: UnsubscribeFunc | undefined;

    onMount( async () => {
        unsubscribe = await pb.collection('monitors').subscribe('*', updateCounts);
    })
    
    onDestroy(() => unsubscribe && unsubscribe())
</script>
<div class="d-flex min-vw-100 vh-100">
    <aside class="layout__nav">
        <nav class="nav flex-column gap-2">
            <a class="nav-link active" href="/dashboard">
                <span class="material-symbols-outlined">
                    space_dashboard
                </span>
                Dashboard
            </a>
            <a class="nav-link" href="#">
                <span class="material-symbols-outlined">
                    mimo
                </span>
                Monitors
            </a>
            <a class="nav-link" href="#">
                <span class="material-symbols-outlined">
                    pulse_alert
                </span>
                Logs
            </a>
        </nav>
    </aside>
    <main class="flex-grow-1 p-4">
        <slot />
    </main>
</div>
