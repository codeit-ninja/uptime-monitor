<script lang="ts">
    import { generateInputId } from "$lib";

    export let value: string;
    export let label: string;
    export let name: string;
    export let id = generateInputId();
</script>
<div class="mb-4">
    <div>
        <label for={id} class="form-label">{ label }</label>
    </div>
    <input 
        type="radio" 
        class="btn-check" autocomplete="off"

        {id}
        {name}
        {value}
    />
    <label class="btn" for="option1">{ value }</label>
</div>