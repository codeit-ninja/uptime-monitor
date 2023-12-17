<script lang="ts">
    type CountWidgetProps = {
        count: string;
        title: string;
        color?: 'body' | 'primary' | 'secondary' | 'danger' | 'warning' | 'success' | 'info';
        variant?: 'default' | 'danger' | 'success';
    }

    let {
        count,
        title,
        color,
        variant
    } = $props<CountWidgetProps>();
</script>
<div class="widget widget-{variant}">
    <span class="text text-{color}">{count}</span>
    <span class="badge badge-{color}">{title}</span>
</div>