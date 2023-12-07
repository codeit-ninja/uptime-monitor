<script lang="ts">
    import { object, string, number, ValidationError } from 'yup';
    import Text from "./fields/Text.svelte";
    import Url from './fields/Url.svelte';
    import Number from './fields/Number.svelte';
    import Submit from './fields/Submit.svelte';
    import RadioButtonGroup from './fields/RadioButtonGroup.svelte';

    const data = {
        name: 'Nijlandpaardencoaching.nl',
        url: 'https://nijlandpaardencoaching.nl',
        interval: 10,
        timeout: 30,
        method: 'GET',
        submitting: false
    }

    const schema = object({
        name: string().required(),
        url: string().required(),
        interval: number().required().min(10).max(1440),
        timeout: number().required().min(5).max(60),
        method: string().required(),
    })

    const submit = async (event: { currentTarget: EventTarget & HTMLFormElement }) => {
        const formData = Object.fromEntries(new FormData(event.currentTarget));
        
        data.submitting = true;

        // Return when form fields dont satisfies constraints
        if( false === event.currentTarget.checkValidity() ) {
            return event.currentTarget.classList.add('was-validated');
        }

        try {
            const formdata = await schema.validate( formData, { abortEarly: false } );

            const request = await fetch('/api/monitors/http/create', {
                method: 'POST',
                body: JSON.stringify( formdata ),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const response = await request.text();

            console.log(response)
        } catch(err) {
            if( err instanceof ValidationError ) {
                //console.log(err.inner)
            }
        }

        setTimeout(() => data.submitting = false, 500);
    }
</script>
<form method="post" class="needs-validation" on:submit|preventDefault={submit} novalidate>
    <RadioButtonGroup
        bind:value={data.method}
        label="HTTP Method"
        options={[ 'GET', 'POST', 'PATCH', 'PUT', 'DELETE' ]}
        name="method"
    />
    <Text 
        bind:value={data.name} 
        name="name" 
        label="Friendly name" 
        required 
    />
    <Url 
        bind:value={data.url} 
        name="url" 
        label="URL" 
        required 
    />
    <Number 
        bind:value={data.interval}
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
        bind:value={data.timeout}
        min="5"
        max="60"
        step="1"
        name="timeout" 
        label="Timeout" 
        before="After" 
        after="seconds"
        required 
    />
    <Submit value="Create monitor" submitting={data.submitting} />
</form>