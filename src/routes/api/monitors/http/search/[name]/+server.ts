import { pb } from "$lib/pocketbase";
import { json, type RequestHandler } from "@sveltejs/kit"

export const GET: RequestHandler = async () => {
    // try {
    //     const record = await pb.collection('http_monitors').getFirstListItem(`${key}~"${value}"`, { expand: 'user' });
    //     const recordValue = record[key];
        
    //     if( 'string' === typeof recordValue && 'string' === typeof value ) {
    //         return recordValue.toLowerCase() === value.toLowerCase() ? record : null;
    //     } 

    //     return recordValue === value ? record : null;
    // } catch(_) {
    //     return null;
    // }
}