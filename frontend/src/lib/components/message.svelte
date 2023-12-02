<script lang="ts">
import Icon from '@iconify/svelte';
import type { IMessage } from "../../store/models/Chatrooms.model";
import { Avatar } from "@skeletonlabs/skeleton";
import type { IUser } from "../../store/models/Users.model";
	import { AxiosRequest } from '../../store/utils/request';
	import { getContext } from 'svelte';
	import { AxiosError } from 'axios';
	import { writable } from 'svelte/store';

export let originalMessage:IMessage;
const message = writable<IMessage>(originalMessage);

export let sent:boolean;
export let user:IUser|undefined;
let authContext:{currentUser:IUser, accessToken:string} = getContext('authContext')

async function deleteMessage() {
  let url:string;
  message.subscribe(state => url = 'chatrooms/'+state.chatroomId+'/messages/'+state.id)
  console.log(url)
  const response = await AxiosRequest(url,'DELETE',undefined, authContext.accessToken)
  if (response instanceof AxiosError)
  {
    console.log(response.isAxiosError)
    return;
  }
  message.set(response.data);
  return;
}
</script>

<div class="flex items-center group" class:sent={sent} class:received={!sent} >
  <Avatar initials="{user?.firstname} {user?.lastname}" width="w-14" background={sent?"bg-blue-900":"bg-gray-600"} border="border-2 border-surface-300-600-token hover:!border-primary-100" cursor="cursor-pointer" />
  {#if (!$message?.deletedAt)}
    <div class="mx-3 flex flex-col space-y-1">
      <p class="px-6 py-3 mx-3 max-w-xs lg:max-w-md message" class:sent={sent}>{$message.message}</p>
      <p class="text-xs">{new Date($message.createdAt).toLocaleString()}</p>
    </div>
    {#if sent}
    <button on:click={()=>deleteMessage()} type="button" class="hidden group-hover:block flex flex-shrink-0 bg-red-400 focus:outline-none mx-2 block rounded-full text-gray-900 hover:text-gray-100 hover:bg-red-500 w-8 h-8 p-2">
      <Icon icon="fluent:delete-24-regular" />
    </button>
      {/if}
   {:else}
    <p class="text-sm text-gray-600 px-6 py-3 rounded-t-full border-2 border-gray-800 mx-3 rounded-l-full bg-gray-900 max-w-xs lg:max-w-md">message deleted {new Date($message.deletedAt).toLocaleString()}</p>
  {/if}
</div>
<style lang="scss">
  .sent{
    @apply ml-auto flex-row-reverse;
    p{
      @apply rounded-t-full rounded-l-full;
    }
    p.message {
      @apply bg-blue-700;
    }
  }
  .received{
    @apply mr-auto;
    p{
      @apply rounded-t-full rounded-r-full
    }
    p.message {
      @apply bg-gray-700;
    }
  }
</style>