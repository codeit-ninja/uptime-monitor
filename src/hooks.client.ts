import 'material-symbols/outlined.scss';
import { pb } from '$lib/pocketbase';
import { user } from '$lib/stores/user';
import type { UsersResponse } from '$lib/types/pocketbase-types';
import {
    Chart, 
    LineController, 
    CategoryScale,
    LinearScale, 
    PointElement, 
    LineElement, 
    Tooltip, 
    Filler,
    LogarithmicScale,
} from 'chart.js'

Chart.register(LineController, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler, LogarithmicScale)

pb.authStore.loadFromCookie(document.cookie)
pb.authStore.onChange(() => {
    document.cookie = pb.authStore.exportToCookie({ httpOnly: false })

    if( pb.authStore.model ) {
        user.set( pb.authStore.model as UsersResponse )
    }
}, true)