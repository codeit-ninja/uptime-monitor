import type { UsersResponse } from "$lib/types/pocketbase-types";
import { writable } from "svelte/store";

export const user = writable<UsersResponse>();