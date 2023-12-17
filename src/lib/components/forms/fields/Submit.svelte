<script lang="ts">
    type SubmitProps = {
        value: string;
        variant?: string;
        disabled?: boolean;
        submitting?: boolean;
    }

    let {
        value,
        variant     = 'primary',
        disabled    = false,
        submitting  = false
    } = $props<SubmitProps>();
</script>
<div class="d-flex justify-content-end mt-5">
    <button class="btn btn-{ variant } d-flex align-items-center gap-3" type="submit" {disabled}>
        {#if submitting}
            <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
        {/if}
        { value }
    </button>
</div>