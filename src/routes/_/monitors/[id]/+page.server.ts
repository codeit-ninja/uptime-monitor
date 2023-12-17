// @ts-nocheck
import { client } from '$lib/directus';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ( { params } ) => {
    console.log(params)

    await client

    return {

    }
}