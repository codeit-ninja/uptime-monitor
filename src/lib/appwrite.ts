import { Account, Client } from "appwrite";

export const client = new Client()
export const account = new Account( client )

client
    .setEndpoint( 'https://appwrite.codeit.website/v1' )
    .setProject( '656f9f7ecf07bd2d8504' )