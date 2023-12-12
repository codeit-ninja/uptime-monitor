import { pb } from "./pocketbase";
import type { HttpMonitorsRecord } from "./types/pocketbase-types";

export const monitors = () => {
    const collection = pb.collection('http_monitors');

    const find = async <K extends keyof HttpMonitorsRecord>( key: K, value: HttpMonitorsRecord[K] ) => {
        try {
            const record = await collection.getFirstListItem(`${key}~"${value}"`, { expand: 'user' });
            const recordValue = record[key];
            
            if( 'string' === typeof recordValue && 'string' === typeof value ) {
                return recordValue.toLowerCase() === value.toLowerCase() ? record : null;
            } 

            return recordValue === value ? record : null;
        } catch(_) {
            return null;
        }
    }

    const create = async ( monitor: HttpMonitorsRecord ) => {
        return collection.create( monitor );
    }

    return {
        find,
        create
    }
}