<script lang="ts">
    import { pb } from "$lib/database";

    const github = () => pb.collection('users').authWithOAuth2({ provider: 'github' });
</script>
<button class="btn btn-secondary" on:click={github}>Login using Github</button>