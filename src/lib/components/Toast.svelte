<script lang="ts">
    import type { Toast } from "bootstrap";
    import { onMount } from "svelte";

    type ToastProps = {
        title: string;
        message: string;
        dismissible?: boolean;
        show?: boolean;
    }

    let { 
        title,
        message,
        dismissible = true,
        show = false
    } = $props<ToastProps>()

    let toastElement = $state<HTMLDivElement>();
    let toast = $state<Toast>();
    
    onMount( async () => {
        const { Toast } = await import("bootstrap")

        toast = new Toast( toastElement! )
    })

    $effect( () => {
        if( show && toast ) {
            toast.show()
        }
    })
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
