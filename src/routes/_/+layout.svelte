<script lang="ts">
    import { onDestroy, onMount } from "svelte";

    let unsubscribe: undefined;
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
