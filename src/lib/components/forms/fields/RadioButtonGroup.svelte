<script lang="ts">
    import { generateInputId } from "$lib";

    export let options: string[] = [];
    export let value: string;
    export let label: string;
    export let name: string;
    export let id = generateInputId();
    export let error: null | string = null;
</script>
<div class="mb-4">
    <label for={id} class="form-label">{ label }</label>
    <div class="d-flex gap-1">
        {#each options as option, index}
            <input 
                type="radio" 
                class="btn-check" 
                autocomplete="off"
                id={`${id}-${index}`}

                {name}
                value={option}
                checked={value === option ? true : false}
                on:click={() => value = option}
            />
            <label class="btn" for={`${id}-${index}`}>{ option }</label>
        {/each}
    </div>
    {#if error}
        <div class="form-control-error">
            { error } 
        </div>
    {/if}
</div>