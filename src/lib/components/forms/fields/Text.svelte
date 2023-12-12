<script lang="ts">
    import { generateInputId } from "$lib";
    import Input from "./Input.svelte";

    export let value: string;
    export let label: string;
    export let name: string;
    export let required = false;
    export let disabled = false;
    export let id = generateInputId();
    export let error: null | string = null;
    export let onInput = (event: Event) => {};
</script>
<div class="mb-4">
    <label for={id} class="form-label">{ label }</label>
    <input
        class="form-control"
        class:is-invalid={error}
        type="text"

        {id}
        {name}
        {required}
        {disabled}
        bind:value={value}
        on:input={onInput}
    />
    {#if error}
        <div class="form-control-error">
            { error } 
        </div>
    {/if}
</div>