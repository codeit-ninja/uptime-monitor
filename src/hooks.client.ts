import "bootstrap";
import { pb } from '$lib/database';

pb.authStore.loadFromCookie(document.cookie)
pb.authStore.onChange(() => {
    document.cookie = pb.authStore.exportToCookie({ httpOnly: false })
}, true)