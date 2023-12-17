<script lang="ts">
    import { generateInputId } from "$lib";

    type RadioProps = {
        options: string[];
        value: string;
        label: string;
        name: string;
        id?: string;
        error?: string | null;
    }

    let {
        options = [],
        value,
        label,
        name,
        id = generateInputId(),
        error = null
    } = $props<RadioProps>();
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