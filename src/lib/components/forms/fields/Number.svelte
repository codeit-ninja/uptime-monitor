<script lang="ts">
    import { generateInputId } from "$lib";

    export let value: number;
    export let label: string;
    export let name: string;
    export let min = '';
    export let max = '';
    export let step = '';
    export let id = generateInputId();
    export let before = '';
    export let after = '';
    export let required = false;
    export let disabled = false;
    export let error: null | string = null;
</script>
<div class="mb-4">
    <label for={id} class="form-label">{ label }</label>
    {#if before || after}
        <div class="d-flex align-items-center gap-2">
            {#if before}
                <span class="small text-muted">{ before }</span>
            {/if}
            <input
                class="form-control w-auto"
                type="number"
                class:is-invalid={error}

                {id}
                {name}
                {min}
                {max}
                {step}
                {required}
                {disabled}
                bind:value={value}
            />
            {#if after}
                <span class="small text-muted">{ after }</span>
            {/if}
        </div>
    {:else}
        <input
            class="form-control w-auto"
            type="number"
            class:is-invalid={error}

            {id}
            {name}
            {value}
            {required}
            {disabled}
        />
    {/if}
    {#if error}
        <div class="form-control-error">
            { error } 
        </div>
    {/if}
</div>