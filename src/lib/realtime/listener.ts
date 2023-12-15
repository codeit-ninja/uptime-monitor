import { client } from "$lib/directus";
import type { SubscribeOptions } from "@directus/sdk";
import mitt from "mitt";

export type EventData<T extends keyof CustomDirectusTypes> = {
    event: 'init' | 'create' | 'update' | 'delete';
    type: 'subscription';
    data: CustomDirectusTypes[T];
    uid?: string;
}

export type Events<T extends keyof CustomDirectusTypes> = {
    init: EventData<T>;
    create: EventData<T>;
    update: EventData<T>;
    delete: EventData<T>;
    unsubscribe: () => void;
}

export const listen = async <T extends keyof CustomDirectusTypes>( collection: T, query?: SubscribeOptions<CustomDirectusTypes, T>['query'] ) => {
    const events = mitt<Events<T>>()

    const { subscription, unsubscribe } = await client.subscribe( collection, { query });

    ( async () =>  {
        for await (const item of subscription) {
            switch (item.event) {
                case 'init':
                    // @ts-ignore
                    events.emit('init', item);
                    break;
                case 'create': 
                    // @ts-ignore
                    events.emit('create', item);
                    break;
                case 'update': 
                    // @ts-ignore
                    events.emit('update', item);
                    break;
                case 'delete': 
                    // @ts-ignore
                    events.emit('delete', item);
                    break;
                default:
                    break;
            }
        }
    })()

    return {
        events, 
        unsubscribe
    }
}