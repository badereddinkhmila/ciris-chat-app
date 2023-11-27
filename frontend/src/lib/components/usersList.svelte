<script lang="ts">
  import UserListItem from "$lib/components/userListItem.svelte";
  import type { IUser } from "../../store/models/Users.model";
  import type { IChatroom } from "../../store/models/Chatrooms.model";

  export let users: IUser[]
  export let chatrooms: IChatroom[]

  function selectRoomId (userId:string){
    const chatroom = chatrooms.findLast(room => room.users.find(user => user.id ===userId))
    if (chatroom)
      return chatroom.id;
  }
</script>


<div class="contacts p-2 flex-1 overflow-y-scroll">
  {#each users as user, index}
    <UserListItem user={user} chatroomId={selectRoomId(user.id)} key={index}/>
  {/each}
</div>