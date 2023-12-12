import { account } from '$lib/appwrite';
import 'material-symbols/outlined.scss';

account.createEmailSession('richard@codeit.ninja', 'Creative12!@').then(console.log)