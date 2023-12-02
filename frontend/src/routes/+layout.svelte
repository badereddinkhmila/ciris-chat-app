<script lang="ts">
	import '../app.scss';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup, AppBar } from '@skeletonlabs/skeleton';
  import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	import { authStore } from '../store/index.store';
	import type { IUser } from '../store/models/Users.model';
	import { goto } from '$app/navigation';

  storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

  let currentUser:IUser|undefined;
  onMount(()=>{
    authStore.subscribe(values => {
      currentUser = values.currentUser
    })
  })
  async function signout() {
    await goto('/signout')
  }
</script>

{#key currentUser}  
<AppBar background="bg-gray-900" class="font-mono shadow-lg">
  <svelte:fragment slot="lead">
    <a href="/">
    <div  class="flex items-center space-x-5">
       <span class=" text-3xl font-bold">Ciris Chat</span>
  </div></a>
  </svelte:fragment>
  <svelte:fragment slot="trail">
    <div class="flex items-center space-x-10">
      {#if !currentUser }
      <a href="/login">
        <div class="flex items-center space-x-2">
          <Icon icon="arcticons:sqrllogin" height="32" />
          <p>Login</p>
        </div>
      </a>
    <a href="/register">
      <div class="flex items-center space-x-2">
        <Icon icon="arcticons:simplelogin" height="32" />
        <p>Register</p>
      </div>
    </a>
      {:else}
      <a href="/chatroom">
        <div class="flex items-center space-x-2">
          <Icon icon="et:chat" height="32"/>
          <p>Chatroom</p>
        </div>
      </a>
      <a type="button" href="#" on:click={()=>signout()}>
        <div class="flex items-center space-x-2">
          <Icon icon="solar:logout-3-broken" height="32"/>
          <p>Logout</p>
        </div>
      </a>
      {/if}
    </div>
  </svelte:fragment>
</AppBar>
{/key }

<div class="overflow-hidden h-full">
  <slot/>
</div>