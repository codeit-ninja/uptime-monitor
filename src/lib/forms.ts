import { get, writable } from "svelte/store";
import type { Schema } from "./schemas/Schema";

const createFormStore = <S extends Record<string, any>>( values: S ) => {
    const { update, subscribe, set } = writable<S>(values);

    return {
        subscribe,
        update,
        set,
        reset: () => set( values )
    }
}

export const useForm = <T extends Record<string, any>>( schema: Schema<T> ) => {
    const form = createFormStore( schema.fields )
    const errors = createFormStore( schema.errors )
    const submitted = writable(false)
    const processing = writable(false)
    
    const validate = async () => await schema.validate( get( form ) ).then(result => {
        errors.set( schema.errors )
        return result;
    }).catch(() => false)

    return {
        form,
        errors,
        processing,
        submitted,
        validate
    }
}