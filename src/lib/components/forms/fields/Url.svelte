<script lang="ts">
    import Input from "./Input.svelte";
    import { generateInputId } from "$lib";

    type UrlProps = {
        value: number;
        label: string;
        name: string;
        id: string;
        required: boolean;
        disabled: boolean;
        error: string | null;
    }

    let { 
        value,
        label,
        name,
        id           = generateInputId(),
        required    = false,
        disabled    = false,
        error       = null
    } = $props<UrlProps>()
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