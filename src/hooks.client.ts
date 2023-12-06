import "bootstrap";
import { pb, authenticate } from '$lib/database';

if( false === pb.authStore.isValid ) {
    authenticate();
}