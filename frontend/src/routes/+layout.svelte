<script lang="ts">
	import '../app.scss';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup, AppBar, Avatar } from '@skeletonlabs/skeleton';
  import Icon from '@iconify/svelte';

  storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<AppBar background="bg-gray-900" class="font-mono shadow-2xl">
  <svelte:fragment slot="lead">
    <div  class="flex items-center space-x-5">
       <span class=" text-3xl font-bold">Ciris Chat</span>
  </div>
  </svelte:fragment>
  <svelte:fragment slot="trail">
    <div class="flex items-center space-x-10">
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
      <Avatar class="hover:!border-primary-500" cursor="cursor-pointer" initials="AB" background="bg-blue-600	" width="w-12" rounded="rounded-full"
              fullback="https://images.unsplash.com/photo-1617296538902-887900d9b592?ixid=M3w0Njc5ODF8MHwxfGFsbHx8fHx8fHx8fDE2ODc5NzExMDB8&ixlib=rb-4.0.3&w=128&h=128&auto=format&fit=crop"
      />
    </div>
  </svelte:fragment>
</AppBar>
<div class="overflow-hidden h-full">
  <slot/>
</div>