<script lang="ts">
    export let variant: 'default' | 'danger' | 'success' = 'default'; 
    export let count: number;
    export let title: string;
    export let color: 'body' | 'primary' | 'secondary' | 'danger' | 'warning' | 'success' | 'info' = 'body';
</script>
<div class="widget widget-{variant}">
    <span class="text text-{color}">{count}</span>
    <span class="badge badge-{color}">{title}</span>
</div>