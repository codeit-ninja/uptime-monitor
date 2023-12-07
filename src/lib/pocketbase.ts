import type { TypedPocketBase } from '$lib/types/pocketbase-types';
import PocketBase from 'pocketbase';

export const pb = new PocketBase('http://127.0.0.1:8090') as TypedPocketBase;

export async function authenticate() {
    return await pb.collection('users').authWithOAuth2({ provider: 'github' });
}