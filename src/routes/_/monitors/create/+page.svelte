<script>
    import HttpMonitor from "$lib/components/forms/HttpMonitor.svelte";
    import PingMonitor from "$lib/components/forms/PingMonitor.svelte";
    import PortMonitor from "$lib/components/forms/PortMonitor.svelte";

    const types = [
        {
            name: 'HTTP(S)',
            slug: 'http',
            form: HttpMonitor
        },
        {
            name: 'Ping',
            slug: 'ping',
            form: PingMonitor
        },
        {
            name: 'Port',
            slug: 'port',
            form: PortMonitor
        }
    ]

    let selectedType = types[0]
</script>
<section class="section-xl">
    <h3 class="mb-4">Create new monitor</h3>
    
    <svelte:component this={selectedType.form} />

</section>