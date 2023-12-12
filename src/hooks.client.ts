import 'material-symbols/outlined.scss';
import { pb } from '$lib/pocketbase';
import { user } from '$lib/stores/user';
import type { UsersResponse } from '$lib/types/pocketbase-types';

pb.authStore.loadFromCookie(document.cookie)
pb.authStore.onChange(() => {
    document.cookie = pb.authStore.exportToCookie({ httpOnly: false })

    if( pb.authStore.model ) {
        user.set( pb.authStore.model as UsersResponse )
    }
}, true)