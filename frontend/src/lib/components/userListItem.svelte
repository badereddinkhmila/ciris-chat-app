<script lang="ts">
  import { Avatar } from "@skeletonlabs/skeleton";
  import { goto } from "$app/navigation";
  import { AxiosRequest } from "../../store/utils/request";
  import type { AxiosResponse } from "axios";
  import type { IChatroom } from "../../store/models/Chatrooms.model";
  import { AxiosError } from "axios";
  import { getContext } from "svelte";

  export let user:{id: string, firstname:string, lastname:string, email:string};
  export let chatroomId: string|undefined;

  export let key: number;
  let authContext:{ currentUserId : string, accessToken: string } = getContext('authContext')
  const handleRoom = async (userId:string, roomId:string|undefined) => {
    if (roomId)
      goto('/chatroom/'+roomId);
    if (authContext.currentUserId && authContext.accessToken) {
      const chatroom:AxiosResponse<IChatroom, Error> =
        await AxiosRequest('chatrooms', 'POST',
          {users: [{ id: userId },{id:authContext.currentUserId}]},authContext.accessToken);
      if (chatroom instanceof AxiosError) console.log('Errors');
      await goto('/chatroom/'+chatroom.data.id)
    }
  }
</script>

<a href="#" role="button" tabindex={key} class="flex justify-between items-center p-3 hover:bg-gray-800 rounded-lg relative cursor-pointer"
     on:click={()=>handleRoom(user.id, chatroomId)} >
  <div class="w-16 h-16 relative flex flex-shrink-0">
    <Avatar class="hover:!border-primary-500" cursor="cursor-pointer" initials={`${user.firstname[0]}${user.lastname[0]}`} background="bg-blue-600" rounded="rounded-full" />
    <div class="absolute bg-gray-900 p-1 rounded-full bottom-0 right-0">
      <div class="bg-green-500 rounded-full w-3 h-3"></div>
    </div>
  </div>
  <div class="flex-auto min-w-0 ml-4 mr-6 hidden md:block group-hover:block">
    <p>{user.firstname} {user.lastname}</p>
    <div class="flex items-center text-sm text-gray-600">
      <div class="min-w-0">
        <p class="truncate">You sent a video.
        </p>
      </div>
      <p class="ml-2 whitespace-no-wrap">11 Feb</p>
    </div>
  </div>
  <div class="w-4 h-4 flex flex-shrink-0 hidden md:block group-hover:block">
    <img class="rounded-full w-full h-full object-cover" alt="user2"
         src="https://randomuser.me/api/portraits/women/23.jpg"/>
  </div>
</a>
