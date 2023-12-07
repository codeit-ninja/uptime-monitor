<script lang="ts">
    import { generateInputId } from "$lib";

    export let name: string;
    export let value: number|string = "";
    export let type = 'text';
    export let required = false;
    export let disabled = false;
    export let id = generateInputId();
</script>
<input
    class="form-control"
    { ...{ type } }
    {name}
    {id}
    {required}
    {disabled}
    bind:value={value}
/>