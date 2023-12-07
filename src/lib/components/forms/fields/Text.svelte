<script lang="ts">
    import Input from "./Input.svelte";

    export let value: string;
    export let label: string;
    export let name: string;
    export let required = false;
    export let disabled = false;
    export let id = '';
</script>
<div class="mb-4">
    <label for={id} class="form-label">{ label }</label>
    <Input
        type="text"
        {name}
        {required}
        {disabled}
        bind:value={value}
        bind:id={id}
    />
    <div class="invalid-feedback">
        This field is required
    </div>
</div>