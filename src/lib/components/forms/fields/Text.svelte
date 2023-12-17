<script lang="ts">
    import { generateInputId } from "$lib";

    type TextProps = {
        value: number;
        label: string;
        name: string;
        id: string;
        required: boolean;
        disabled: boolean;
        onInput: ( event: Event ) => {};
        error: string | null;
    }

    let { 
        value,
        label,
        name,
        id          = generateInputId(),
        required    = false,
        disabled    = false,
        error       = null,
        onInput     = (event: Event) => {}
    } = $props<TextProps>();
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