<script lang="ts">
import Icon from '@iconify/svelte';
import type { IMessage } from "../../store/models/Chatrooms.model";
import { Avatar } from "@skeletonlabs/skeleton";
import type { IUser } from "../../store/models/Users.model";

export let message:IMessage;
export let sent:boolean = false;
export let user:IUser|undefined;

function deleteMessage(id:string) {
  console.log(id)
}
</script>

<div class="flex items-center group" class:sent={sent} class:received={!sent} >
  <Avatar initials="{user?.firstname} {user?.lastname}" width="w-14" border="border-2 border-surface-300-600-token hover:!border-primary-100" cursor="cursor-pointer" />
  {#if (!message.deletedAt)}
    <div class="mx-3 flex flex-col space-y-1">
      <p class="px-6 py-3 bg-blue-700 mx-3 max-w-xs lg:max-w-md">{message.message}</p>
      <p class="text-xs">{new Date(message.createdAt).toLocaleString()}</p>
    </div>
    {#if sent}
    <button on:click={()=>deleteMessage(message.id)} type="button" class="hidden group-hover:block flex flex-shrink-0 bg-red-400 focus:outline-none mx-2 block rounded-full text-gray-900 hover:text-gray-100 hover:bg-red-500 w-8 h-8 p-2">
      <Icon icon="fluent:delete-24-regular" />
    </button>
      {/if}
   {:else}
    <p class="text-sm text-gray-600 px-6 py-3 rounded-t-full border-2 border-gray-800 mx-3 rounded-l-full bg-gray-900 max-w-xs lg:max-w-md">message deleted {new Date(message.deletedAt).toLocaleString()}</p>
  {/if}
</div>

<style lang="scss">
  .sent{
    @apply ml-auto flex-row-reverse;
    p{
      @apply rounded-t-full rounded-l-full;
    }

  }
  .received{
    @apply mr-auto;
    p{
      @apply rounded-t-full rounded-r-full
    }
  }
</style>