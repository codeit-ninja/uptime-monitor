<script lang="ts">
    import { enhance } from "$app/forms";
    import Select from "$lib/components/Select.svelte";
    import type { SubmitFunction } from "@sveltejs/kit";

    let type: 'http'|'port'|'ping' = 'http';
    let http = {
        method: 'GET',
        name: '',
        url: '',
        interval: 20,
        timeout: 30,
        expectedStatus: {
            selected: ['200-299'],
            ranges: [
                '100-199',
                '200-299',
                '300-399',
                '400-499',
                '500-599',
            ].concat(Array.apply(null, Array(500)).map((value: any, index: number) => {
                return (index + 100).toString();
            }))
        }
    }

    const submit: SubmitFunction<Record<string, unknown> | undefined, Record<string, unknown> | undefined> = async ({ formElement, formData, action, cancel, submitter }) => {
        return async ({ result, update }) => {
            
			// `result` is an `ActionResult` object
			// `update` is a function which triggers the default logic that would be triggered if this callback wasn't set
		};
    }

    $: console.log(http)
</script>
<section class="section-xl">
    <h2 class="mb-4">Add new monitor</h2>
    <form method="POST" use:enhance={submit}>
        <div class="mb-4">
            <div>
                <label for="monitor-url" class="form-label">Type</label>
            </div>
            <div class="btn-group btn-group-sm" role="group">
                <input 
                    type="radio" 
                    class="btn-check" 
                    name="monitor-type" 
                    id="monitor-type-http" 
                    autocomplete="off"
                    value="http"
                    bind:group={type}
                >
                <label class="btn btn-outline-secondary" for="monitor-type-http">HTTP(S)</label>
              
                <input 
                    type="radio" 
                    class="btn-check" 
                    name="monitor-type" 
                    id="monitor-type-ping" 
                    autocomplete="off"
                    value="ping"
                    bind:group={type}
                >
                <label class="btn btn-outline-secondary" for="monitor-type-ping">Ping</label>
              
                <input 
                    type="radio" 
                    class="btn-check" 
                    name="monitor-type" 
                    id="monitor-type-port" 
                    autocomplete="off" 
                    value="port"
                    bind:group={type}
                >
                <label class="btn btn-outline-secondary" for="monitor-type-port">Port</label>
            </div>
        </div>
    
        {#if type === 'http'}
            <div class="mb-4">
                <div>
                    <label for="monitor-url" class="form-label">Method</label>
                </div>
                <div class="btn-group btn-group-sm" role="group">
                    <input 
                        type="radio" 
                        class="btn-check" 
                        name="monitor-http-method" 
                        id="monitor-http-method-head" 
                        autocomplete="off"
                        value="GET"
                        bind:group={http.method}
                    >
                    <label class="btn btn-outline-secondary" for="monitor-http-method-head">GET</label>
                
                    <input 
                        type="radio" 
                        class="btn-check" 
                        name="monitor-http-method" 
                        id="monitor-http-method-get" 
                        autocomplete="off"
                        value="POST"
                        bind:group={http.method}
                    >
                    <label class="btn btn-outline-secondary" for="monitor-http-method-get">POST</label>
                
                    <input 
                        type="radio" 
                        class="btn-check" 
                        name="monitor-http-method" 
                        id="monitor-http-method-post" 
                        autocomplete="off" 
                        value="PUT"
                        bind:group={http.method}
                    >
                    <label class="btn btn-outline-secondary" for="monitor-http-method-post">PUT</label>
                </div>
            </div>
            <div class="mb-4">
                <label for="monitor-name" class="form-label">Name</label>
                <input type="text" class="form-control" id="monitor-name" />
            </div>
            <div class="mb-4">
                <label for="monitor-url" class="form-label">URL</label>
                <input type="text" class="form-control" value="https://" id="monitor-url" />
            </div>
            <div class="mb-4">
                <label for="monitor-interval" class="form-label">Interval</label>
                <div class="d-flex align-items-center gap-2">
                    <div class="text-muted small">Every</div>
                    <input 
                        type="number" 
                        class="form-control w-auto" 
                        min="20"
                        step="1"
                        max="1440"
                        id="monitor-interval" 
                        bind:value={ http.interval }
                    >
                    <div class="text-muted small">{ http.interval === 1 ? 'second' : 'seconds' }</div>
                </div>
            </div>
            <div class="mb-4">
                <label for="monitor-timeout" class="form-label">Timeout</label>
                <input 
                    type="range" 
                    class="form-range" 
                    min="1"
                    max="60"
                    step="1"
                    id="monitor-timeout" 
                    bind:value={ http.timeout }
                >
                <div class="form-text">
                    After <i>{ http.timeout }</i> { http.timeout === 1 ? 'second' : 'seconds' }
                </div>
            </div>
            <div class="mb-4">
                <label for="monitor-timeout" class="form-label">Expected status</label>
                <Select options={ http.expectedStatus.ranges } multiple />
            </div>
        {/if}
        <div class="mb-4">
            <button class="btn btn-secondary shadow-sm">Create</button>
        </div>
    </form>
</section>