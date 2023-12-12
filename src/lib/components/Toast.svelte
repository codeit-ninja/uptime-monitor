<script lang="ts">
    import type { Toast } from "bootstrap";
    import { onMount } from "svelte";

    export let title: string;
    export let message: string;
    export let dismissible = true;
    export let show = false;

    let toastElement: HTMLDivElement;
    let toast: Toast;

    onMount( async () => {
        const { Toast } = await import("bootstrap")

        toast = new Toast( toastElement )
    })

    $: if( show && toast ) {
        toast.show()
    }
</script>
<div class="position-fixed bottom-0 end-0 p-3">
    <div class="toast" role="alert" aria-live="assertive" aria-atomic="true" bind:this={toastElement}>
        <div class="toast-header">
            <strong class="me-auto">{ title }</strong>
            <small>11 mins ago</small>
            {#if dismissible}
                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="toast"
                    aria-label="Close"
                ></button>
            {/if}
        </div>
        <div class="toast-body">{ message }</div>
    </div>
</div>
