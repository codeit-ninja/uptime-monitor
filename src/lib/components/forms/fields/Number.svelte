<script lang="ts">
    import { generateInputId } from "$lib";

    type NumberProps = {
        value: number;
        label: string;
        name: string;
        min: number;
        max: number;
        step: number;
        before: string;
        after: string;
        required: boolean;
        disabled: boolean;
        id: string;
        error: string;
    }

    let {
        value,
        label,
        name,
        min         = '',
        max         = '',
        step        = '',
        before      = '',
        after       = '',
        required    = false,
        disabled    = false,
        error       = null,
        id          = generateInputId(),
    } = $props<NumberProps>();
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