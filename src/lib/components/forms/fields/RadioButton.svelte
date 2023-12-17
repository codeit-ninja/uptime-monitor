<script lang="ts">
    import { generateInputId } from "$lib";

    type RadioProps = {
        value: number;
        label: string;
        name: string;
        id: string;
    }

    let { 
        value,
        label,
        name,
        id = generateInputId()
    } = $props<RadioProps>();
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