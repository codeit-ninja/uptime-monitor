<script lang="ts">
    import Input from "./Input.svelte";

    export let value: string;
    export let label: string;
    export let name: string;
    export let required = false;
    export let disabled = false;
    export let id = '';
    export let error: null | string = '';
</script>
<div class="mb-4">
    <label for={id} class="form-label">{ label }</label>
    <Input 
        type="url"

        {name}
        {required}
        {disabled}
        bind:value={value}
        bind:id={id}
        bind:error={error}
    />
    {#if error}
        <div class="form-control-error">
            { error } 
        </div>
    {/if}
</div>