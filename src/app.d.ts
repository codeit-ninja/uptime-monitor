// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import { AuthenticationData } from '@directus/sdk'

export type NonNullableFields<T> = {
    [P in keyof T]: NonNullable<T[P]>;
};

declare global {

	namespace App {
		// interface Error {}
		interface Locals {
            auth: NonNullableFields<AuthenticationData>
        }
		// interface PageData {}
		// interface Platform {}
	}
}
export {};
