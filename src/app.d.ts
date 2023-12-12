// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import { UsersResponse } from '$lib/types/pocketbase-types'

declare global {

	namespace App {
		// interface Error {}
		interface Locals {
            auth: UsersResponse
        }
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
