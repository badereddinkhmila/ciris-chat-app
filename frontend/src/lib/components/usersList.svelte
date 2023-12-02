<script lang="ts">
  import UserListItem from "$lib/components/userListItem.svelte";
  import type { IUser } from "../../store/models/Users.model";

  export let users: IUser[]
</script>


<div class="contacts p-2 flex-1 overflow-y-scroll">
  {#each users as user, index}
    <UserListItem selectedUser={user} listKey={index}/>
  {/each}
</div>