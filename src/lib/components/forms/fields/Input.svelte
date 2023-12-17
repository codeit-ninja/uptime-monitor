<script lang="ts">
    import { generateInputId } from "$lib";

    type InputProps = {
        name: string, 
        value: number | string, 
        type?: string, 
        required?: boolean,
        disabled?: boolean,
        id?: string,
        error?: string | null;
    }

    let { 
        name, 
        value       = '', 
        type        = 'text', 
        required    = false,
        disabled    = false,
        id          = generateInputId(),
        error       = ''
    } = $props<InputProps>();
</script>
<input
    class="form-control"
    class:is-invalid={error}
    
    { ...{ type } }
    {name}
    {id}
    {required}
    {disabled}
    bind:value={value}
/>