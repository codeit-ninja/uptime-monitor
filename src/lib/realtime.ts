import type { Query, SubscriptionEvents, SubscriptionOutput, SubscriptionPayload } from "@directus/sdk"
import { client } from "./directus"
import mitt from "mitt"

type SubscribeToParams<T extends keyof CustomDirectusTypes> = {
    collection: T;
    event: 'create' | 'update' | 'delete';
    query?: Query<CustomDirectusTypes, CustomDirectusTypes[T]>
}

type EventData<T extends keyof CustomDirectusTypes, Event extends SubscriptionEvents = 'init'> = {
    event: 'init' | 'create' | 'update' | 'delete';
    type: 'subscription';
    uid?: string;
    data: CustomDirectusTypes[T]
}

type Events<T extends keyof CustomDirectusTypes> = {
    init: Omit<EventData<T>, 'data'>;
    create: EventData<T>;
    update: EventData<T>;
    delete: EventData<T>;
    unsubscribe: () => void;
}

export const subscribeTo = async <T extends keyof CustomDirectusTypes>({ collection, event, query }: SubscribeToParams<T>) => {    
    const emitter = mitt<Events<T>>()
    const { subscription, unsubscribe } = await client.subscribe( collection, { event, query } );
    
    ( async () => {
        for await (const item of subscription) {
            switch (item.event) {
                case 'init':
                    emitter.emit('init', item);
                    break;
                case 'create': 
                    // @ts-ignore
                    emitter.emit('create', item);
                    break;
                case 'update': 
                    // @ts-ignore
                    emitter.emit('update', item);
                    break;
                case 'delete': 
                    // @ts-ignore
                    emitter.emit('delete', item);
                    break;
                default:
                    break;
            }
        }
    })()

    emitter.on('unsubscribe', unsubscribe)

    return emitter;
}