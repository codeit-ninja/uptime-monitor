<script lang="ts">
    import Text from "./fields/Text.svelte";
    import Url from './fields/Url.svelte';
    import Number from './fields/Number.svelte';
    import Submit from './fields/Submit.svelte';
    import RadioButtonGroup from './fields/RadioButtonGroup.svelte';
    import { useForm } from '$lib/forms';
    import { debounce } from 'lodash';
    import { schema } from '$lib/schemas/HttpMonitorSchema';
    import { POST } from '$lib/http';
    import { monitors } from "$lib/api";
    import Toast from "../Toast.svelte";

    const { form, validate, submitted, errors } = useForm( schema )

    const submit = async () => {
        const isValid = await validate()
        
        if( ! isValid ) {
            return false;
        }
        
        await POST( '/api/monitors/http/create', $form );

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