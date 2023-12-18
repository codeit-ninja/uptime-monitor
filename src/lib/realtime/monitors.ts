import { listen, type Events } from "$lib/realtime/listener";
import type { Emitter } from "mitt";

export const subscribe = async ( monitor?: Monitors ) => {
    const query = Object.assign({}, { fields: '*.*' }, monitor ? { filter: { id: { _eq: monitor.id } } } : {});
    // @ts-ignore
    const { events, unsubscribe } = await listen('monitors', query)

    return {
        events,
        unsubscribe
    }
}