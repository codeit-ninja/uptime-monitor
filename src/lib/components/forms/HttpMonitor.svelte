<script lang="ts">
    import Text from "./fields/Text.svelte";
    import Url from './fields/Url.svelte';
    import Number from './fields/Number.svelte';
    import Submit from './fields/Submit.svelte';
    import Toast from "../Toast.svelte";
    import RadioButtonGroup from './fields/RadioButtonGroup.svelte';
    import { useForm } from '$lib/forms';
    import { schema } from '$lib/schemas/HttpMonitorSchema';
    import { client } from "$lib/directus";
    import { createItem } from "@directus/sdk";

    const { form, validate, submitted, errors } = useForm( schema )

    const submit = async () => {
        const isValid = await validate()
        
        if( ! isValid ) {
            return false;
        }

        const monitor_data = {
            method: $form.method,
            url: $form.url,
            timemout: $form.timeout
        }

        const response = await client.request( createItem('monitors', { type: 'HTTP', monitor_data, ...$form }) )
        
        submitted.set(true)
    }
</script>
<form method="post" on:submit|preventDefault={submit} novalidate>
    <RadioButtonGroup
        bind:value={$form.method}
        bind:error={$errors.method}
        label="HTTP Method"
        options={[ 'GET', 'POST', 'PATCH', 'PUT', 'DELETE' ]}
        name="method"
    />
    <Text 
        bind:value={$form.name} 
        bind:error={$errors.name}
        name="name" 
        label="Friendly name" 
        required 
    />
    <Url 
        bind:value={$form.url} 
        bind:error={$errors.url}
        name="url" 
        label="URL" 
        required 
    />
    <Number 
        bind:value={$form.interval}
        bind:error={$errors.interval}
        min="10"
        max="1440"
        step="1"
        name="interval" 
        label="Interval" 
        before="Every" 
        after="seconds"
        required 
    />
    <Number 
        bind:value={$form.timeout}
        bind:error={$errors.timeout}
        min="5"
        max="60"
        step="1"
        name="timeout" 
        label="Timeout" 
        before="After" 
        after="seconds"
        required 
    />
    <Submit value="Create monitor" />

    <Toast message={`Monitor ${$form.name} created`} title="HTTP monitor" show={$submitted} />
</form>