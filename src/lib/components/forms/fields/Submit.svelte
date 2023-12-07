<script lang="ts">
    export let value: string;
    export let variant = 'primary';
    export let disabled = false;
    export let submitting = false;
</script>
<div class="d-flex justify-content-end mt-5">
    <button class="btn btn-{ variant } d-flex align-items-center gap-3" type="submit" {disabled}>
        {#if submitting}
            <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
        {/if}
        { value }
    </button>
</div>