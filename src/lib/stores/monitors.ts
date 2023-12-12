import { getList } from "$lib/api/monitors/http";
import { get, writable } from "svelte/store"
import { user } from "./user";

const createMonitorStore = () => {
    const { subscribe, update } = writable({
        monitorsCount: 0,
        offlineCount: 0,
        onlineCount: 0
    });
    
    return {
        subscribe,
        update,
    }
}

export const updateCounts = async () => {
    const allMonitors = await getList( get( user ) )
    const offlineMonitors = await getList( get( user ), 'online=0' )
    const onlineMonitors = await getList(  get( user ), 'online=1' )
    
    useMonitorStore.update(() => ({ 
        monitorsCount: allMonitors.totalItems, 
        offlineCount: offlineMonitors.totalItems,
        onlineCount: onlineMonitors.totalItems
    }))
}

export const useMonitorStore = createMonitorStore();