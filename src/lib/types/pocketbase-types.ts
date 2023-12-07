/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	HttpMonitors = "http_monitors",
	MonitorTypes = "monitor_types",
	Monitors = "monitors",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type HttpMonitorsRecord = {
	interval: number
	method: string
	name: string
	timeout: number
	url: string
	user: RecordIdString
}

export type MonitorTypesRecord = {
	type: string
}

export type MonitorsRecord<Tdata = unknown> = {
	data: null | Tdata
	interval: number
	name: string
	user: RecordIdString
}

export type UsersRecord = {
	avatar?: string
	name?: string
}

// Response types include system fields and match responses from the PocketBase API
export type HttpMonitorsResponse<Texpand = unknown> = Required<HttpMonitorsRecord> & BaseSystemFields<Texpand>
export type MonitorTypesResponse<Texpand = unknown> = Required<MonitorTypesRecord> & BaseSystemFields<Texpand>
export type MonitorsResponse<Tdata = unknown, Texpand = unknown> = Required<MonitorsRecord<Tdata>> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	http_monitors: HttpMonitorsRecord
	monitor_types: MonitorTypesRecord
	monitors: MonitorsRecord
	users: UsersRecord
}

export type CollectionResponses = {
	http_monitors: HttpMonitorsResponse
	monitor_types: MonitorTypesResponse
	monitors: MonitorsResponse
	users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'http_monitors'): RecordService<HttpMonitorsResponse>
	collection(idOrName: 'monitor_types'): RecordService<MonitorTypesResponse>
	collection(idOrName: 'monitors'): RecordService<MonitorsResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
