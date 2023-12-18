import 'material-symbols/outlined.scss';
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
import { authStore } from '$lib/stores/auth';

Chart.register(LineController, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler, LogarithmicScale)

const cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith("directus_auth"))
    ?.split("=")[1];
    
const token = JSON.parse( decodeURIComponent( cookieValue as string ) );

authStore.set( token );