<script lang="ts">
  import { Avatar } from "@skeletonlabs/skeleton";
  import { goto } from "$app/navigation";
  import { AxiosRequest } from "../../store/utils/request";
  import type { AxiosResponse } from "axios";
  import type { IChatroom } from "../../store/models/Chatrooms.model";
  import { AxiosError } from "axios";
  import { getContext } from "svelte";
	import type { IUser } from "../../store/models/Users.model";

  export let selectedUser:IUser;
  
  export let listKey: number;
  let authContext:{currentUser:IUser, chatrooms:IChatroom[], accessToken:string} = getContext('authContext')
  
  const handleRoom = async (userId:string) => {
    const room = authContext?.chatrooms.findLast((room:IChatroom) => room.users.find(user => user.id === userId))
    if (room === undefined && authContext.currentUser && authContext.accessToken) {
      // check if room was just created in the server
      const _existChatroom:AxiosResponse<IChatroom, Error> =
        await AxiosRequest('chatrooms/isCreated', 'POST',{ userID : userId } ,authContext?.accessToken)
      console.log('chatroom data: ', _existChatroom)
      if (_existChatroom?.data) {
        authContext?.chatrooms.push(_existChatroom.data)  
        await goto('/chatroom/'+_existChatroom.data.id)
        return
      }
      // Create the room
      const chatroom:AxiosResponse<IChatroom, Error> =
        await AxiosRequest('chatrooms', 'POST',
          {users: [{ id: userId },{id:authContext?.currentUser.id}]},authContext?.accessToken);
      if (chatroom instanceof AxiosError) console.log('Errors');
      authContext?.chatrooms.push(chatroom.data)
      await goto('/chatroom/'+chatroom.data.id)
      return
    }
    //Redirect to room
    await goto('/chatroom/'+ room?.id);
    return
  }
</script>

<a href="#" role="button" tabindex={listKey} class="flex justify-between items-center p-3 hover:bg-gray-800 rounded-lg relative cursor-pointer"
     on:click={()=>handleRoom(selectedUser.id)} >
  <div class="w-16 h-16 relative flex flex-shrink-0">
    <Avatar class="hover:!border-primary-500" cursor="cursor-pointer" initials={`${selectedUser.firstname} ${selectedUser.lastname}`} background="bg-blue-600" rounded="rounded-full" />
    <div class="absolute bg-gray-900 p-1 rounded-full bottom-0 right-0">
      <div class="bg-green-500 rounded-full w-3 h-3"></div>
    </div>
  </div>
  <div class="flex-auto min-w-0 ml-4 mr-6 hidden md:block group-hover:block">
    <p>{selectedUser.firstname} {selectedUser.lastname}</p>
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
