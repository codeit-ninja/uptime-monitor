<script lang="ts">
    export let value: string;
    export let variant = 'primary';
    export let disabled = false;
</script>
<div class="d-flex justify-content-end mt-5">
    <button class="btn btn-{ variant }" type="submit" {disabled}>{ value }</button>
</div>