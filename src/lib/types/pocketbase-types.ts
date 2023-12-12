/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	HttpMonitors = "http_monitors",
	MonitorResults = "monitor_results",
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
	method: string
	timeout: number
	url: string
}

export type MonitorResultsRecord<Tdata = unknown> = {
	data?: null | Tdata
	monitor?: RecordIdString
	online?: boolean
	response_time?: number
}

export type MonitorsRecord = {
	interval: number
	monitorId: string
	name: string
	online?: boolean
	type: string
	user: RecordIdString
}

export type UsersRecord = {
	avatar?: string
	name?: string
}

// Response types include system fields and match responses from the PocketBase API
export type HttpMonitorsResponse<Texpand = unknown> = Required<HttpMonitorsRecord> & BaseSystemFields<Texpand>
export type MonitorResultsResponse<Tdata = unknown, Texpand = unknown> = Required<MonitorResultsRecord<Tdata>> & BaseSystemFields<Texpand>
export type MonitorsResponse<Texpand = unknown> = Required<MonitorsRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	http_monitors: HttpMonitorsRecord
	monitor_results: MonitorResultsRecord
	monitors: MonitorsRecord
	users: UsersRecord
}

export type CollectionResponses = {
	http_monitors: HttpMonitorsResponse
	monitor_results: MonitorResultsResponse
	monitors: MonitorsResponse
	users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'http_monitors'): RecordService<HttpMonitorsResponse>
	collection(idOrName: 'monitor_results'): RecordService<MonitorResultsResponse>
	collection(idOrName: 'monitors'): RecordService<MonitorsResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
