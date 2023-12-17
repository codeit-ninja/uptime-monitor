// @ts-nocheck
import type { PageServerLoad } from './$types';
import { client } from '$lib/directus';
import { readItems } from "@directus/sdk";

export const load: PageServerLoad = async () => {
    const monitors: Monitors[] = await client.request( readItems('monitors', {
        fields: ['*', 'monitors_stats.*'],
        deep: {
            "monitors_stats": {
                _limit: 100,
                _sort: "-created_at",
            }
        }
    }) )

    console.log(monitors)

    return {
        monitors
    }
}