import { getMonitors } from '$lib/api/monitors/http';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
    const monitors = await getMonitors( locals.auth )

    console.log(monitors)

    return {
        monitors
    }
}