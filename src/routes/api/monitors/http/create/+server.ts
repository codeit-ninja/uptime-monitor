import { pb } from "$lib/pocketbase";
import type { HttpMonitorsRecord, HttpMonitorsResponse } from "$lib/types/pocketbase-types";
import { json, type RequestHandler } from "@sveltejs/kit"
import type { RecordService } from "pocketbase";

export type HttpMonitorRequestData = {
    method: string;
    timeout: number;
    interval: number;
    url: string;
    name: string;
}

export const GET: RequestHandler = async () => {
    return json('Hi :)');
}

export const POST: RequestHandler = async ({ request }) => {
    const requestData: HttpMonitorRequestData = await request.json()
    const data: HttpMonitorsRecord = { ...requestData, user: pb.authStore.model!.id }
    const record = await pb.collection('http_monitors').create(data);

    console.log(record)
    return json('');
}