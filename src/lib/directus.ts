import { createDirectus } from "@directus/sdk";
import { rest } from "@directus/sdk/rest";
import { authentication } from "@directus/sdk/auth";
import { graphql } from "@directus/sdk/graphql";
import { realtime } from "@directus/sdk/realtime";
import { env } from '$env/dynamic/public';

export const client = createDirectus<CustomDirectusTypes>(env.PUBLIC_DIRECTUS_URL)
    .with(rest())
    .with(authentication('json'))
    .with(graphql())
    .with(realtime())