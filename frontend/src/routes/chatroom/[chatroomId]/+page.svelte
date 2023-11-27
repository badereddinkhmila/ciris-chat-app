<script lang="ts">
  import type { IUser } from "../../../store/models/Users.model";
  import Message from "$lib/components/message.svelte"
  import { Avatar } from "@skeletonlabs/skeleton";
  import Icon from "@iconify/svelte";
  import { getContext, onDestroy, onMount } from "svelte";
  import type { IChatroom } from "../../../store/models/Chatrooms.model";
  import type { Socket } from "socket.io-client";
  import { io, Manager } from "socket.io-client";

  export let data;
  let chatroomId = data?.chatroomId;
  let authContext:{ currentUser: IUser, accessToken: string, users: IUser[], chatrooms: IChatroom[] } = getContext('authContext')
  let userId = authContext.chatrooms.find(chatroom => chatroom.id = chatroomId)?.users.find(user => user.id != authContext.currentUser.id)
  let user:IUser|undefined = authContext.users.find(user => user.id == userId?.id)
  let message = {id:'azert', message: 'bla bla bla', chatroomId:chatroomId,createdBy:authContext.currentUser.id, createdAt:new Date().toISOString(), deletedAt:''}
  let currentMessage:string;
  let socket = data?.socket;
  console.log(socket.id)
  // Socket IO
  socket.on('chat', (e) => {

    console.log('chat event',e)
  })
  onMount(()=>socket.connect())
  onDestroy(()=>socket.disconnect())
</script>

<section class="flex flex-col flex-auto border-l border-gray-800">
  <div class="chat-header px-6 py-4 flex flex-row flex-none justify-between items-center shadow">
    <div class="flex">
      <div class="w-16 h-16 mr-4 relative flex flex-shrink-0">
        <Avatar initials={user?.firstname+' '+user?.lastname} width="w-16" border="border-2 border-surface-300-600-token hover:!border-primary-500" cursor="cursor-pointer" />
      </div>
      <div class="text-sm">
        <p class="font-bold">{user?.firstname} {user?.lastname}</p>
        <p>Active now</p>
      </div>
    </div>

    <div class="flex items-center space-x-3">
      <a href="#" class="flex justify-center items-center rounded-full text-blue-500 hover:bg-gray-700 bg-gray-800 w-10 h-10 p-2">
        <Icon icon="ic:outline-phone" width="24" />
      </a>
      <a href="#" class="flex justify-center items-center rounded-full text-blue-500 hover:bg-gray-700 bg-gray-800 w-10 h-10 p-2">
        <Icon icon="gala:video" width="24" />
      </a>
      <a href="#" class="flex justify-center items-center rounded-full text-blue-500 hover:bg-gray-700 bg-gray-800 w-10 h-10 p-2">
        <Icon icon="ph:info-light" width="24" />
      </a>
    </div>
  </div>
  <div class="chat-body p-4 flex-1 overflow-y-scroll">
      <div class="flex flex-col items-start space-y-2">
        <Message sent={user?.id !== message.createdBy} message={message} user={user?.id === message.createdBy?user:authContext.currentUser}/>
      </div>
  </div>
  <div class="input-group input-group-divider grid-cols-[auto_1fr_auto] rounded-container-token">
    <button class="input-group-shim">+</button>
    <textarea
      bind:value={currentMessage}
      class="bg-transparent border-0 ring-0"
      name="prompt"
      id="prompt"
      placeholder="Write a message..."
      rows="1"
    />
    <button class="variant-filled-secondary">
      <Icon icon="streamline:mail-send-email-message" />
    </button>
  </div>
</section>