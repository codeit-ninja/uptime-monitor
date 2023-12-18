import { listen, type Events } from "$lib/realtime/listener";
import type { Emitter } from "mitt";

export type MonitorsStatsSubscription = (monitor?: Monitors) => Promise<{
    events: Emitter<Events<"monitors_stats">>;
    unsubscribe: () => void;
}>

export const subscribe = async ( monitor?: Monitors ) => {
    const query = Object.assign({}, { fields: '*.*' }, monitor ? { filter: { monitor: { id: { _eq: monitor.id } } } } : {});
    // @ts-ignore
    const { events, unsubscribe } = await listen('monitors_stats', query)

    return {
        events,
        unsubscribe
    }
}