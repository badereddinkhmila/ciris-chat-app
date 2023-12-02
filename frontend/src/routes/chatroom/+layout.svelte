<script lang="ts">
  import Icon from '@iconify/svelte'
  import UsersList from '$lib/components/usersList.svelte'
  import { onMount, setContext } from "svelte";
	import type { IUser } from '../../store/models/Users.model.js';
	import { authStore } from '../../store/index.store.js';

  export let data;
  let users = data?.users?.filter((user:IUser) => user.id != data?.currentUser.id)			
  let authContext = { currentUser : data?.currentUser, accessToken: data?.accessToken, users: users, chatrooms:data?.chatrooms }
  setContext('authContext', authContext)

  onMount(()=>{
    authStore.update((prevState:any)=>(prevState = {currentUser : data?.currentUser, accessToken: data?.accessToken, refreshToken: data?.refreshToken}))
  })
</script>
<div class="card h-5/6 flex-col justify-center items-center p-10 m-20 space-y-10 bg-gray-900">
<div class="h-full w-full flex antialiased text-gray-200 bg-gray-900">
  <div class="flex-1 flex flex-col">
    <main class="flex-grow flex flex-row min-h-0">
      <section class="flex flex-col flex-none overflow-auto w-24 hover:w-64 group lg:max-w-sm md:w-2/5 transition-all duration-300 ease-in-out">
        <div class="search-box p-4 flex-none">
          <form on:submit={()=>true}>
            <div class="relative">
              <label>
                <input class="rounded-full py-2 pr-6 pl-10 w-full border border-gray-800 focus:border-gray-700 bg-gray-800 focus:bg-gray-900 focus:outline-none text-gray-200 focus:shadow-md transition duration-300 ease-in"
                       type="text" value="" placeholder="Search Users"/>
                <span class="absolute top-0 left-0 mt-2 ml-3 inline-block">
                      <Icon icon="cil:search" width="20" />
                  </span>
              </label>
            </div>
          </form>
        </div>
        <div class="active-users flex flex-row p-2 overflow-auto w-0 min-w-full">
          <div class="text-sm text-center mr-4">
            <button class="flex flex-shrink-0 focus:outline-none block bg-gray-800 text-gray-600 rounded-full w-20 h-20"
                    type="button">
              <svg class="w-full h-full fill-current" viewBox="0 0 24 24">
                <path d="M17 11a1 1 0 0 1 0 2h-4v4a1 1 0 0 1-2 0v-4H7a1 1 0 0 1 0-2h4V7a1 1 0 0 1 2 0v4h4z"/>
              </svg>
            </button>
            <p>Your Story</p>
          </div>
          <div class="text-sm text-center mr-4"><div class="p-1 border-4 border-blue-600 rounded-full"><div class="w-16 h-16 relative flex flex-shrink-0">
            <img class="shadow-md rounded-full w-full h-full object-cover"
                 src="https://randomuser.me/api/portraits/women/12.jpg"
                 alt=""
            />
          </div></div><p>Anna</p></div>
          <div class="text-sm text-center mr-4"><div class="p-1 border-4 border-transparent rounded-full"><div class="w-16 h-16 relative flex flex-shrink-0">
            <img class="shadow-md rounded-full w-full h-full object-cover"
                 src="https://randomuser.me/api/portraits/men/75.jpg"
                 alt=""
            />
            <div class="absolute bg-gray-900 p-1 rounded-full bottom-0 right-0">
              <div class="bg-green-500 rounded-full w-3 h-3"></div>
            </div>
          </div></div><p>Jeff</p></div>
          <div class="text-sm text-center mr-4"><div class="p-1 border-4 border-blue-600 rounded-full"><div class="w-16 h-16 relative flex flex-shrink-0">
            <img class="shadow-md rounded-full w-full h-full object-cover"
                 src="https://randomuser.me/api/portraits/women/42.jpg"
                 alt=""
            />
          </div></div><p>Cathy</p></div>
          <div class="text-sm text-center mr-4"><div class="p-1 border-4 border-transparent rounded-full"><div class="w-16 h-16 relative flex flex-shrink-0">
            <img class="shadow-md rounded-full w-full h-full object-cover"
                 src="https://randomuser.me/api/portraits/women/87.jpg"
                 alt=""
            />
            <div class="absolute bg-gray-900 p-1 rounded-full bottom-0 right-0">
              <div class="bg-green-500 rounded-full w-3 h-3"></div>
            </div>
          </div></div><p>Madona</p></div>
          <div class="text-sm text-center mr-4"><div class="p-1 border-4 border-transparent rounded-full"><div class="w-16 h-16 relative flex flex-shrink-0">
            <img class="shadow-md rounded-full w-full h-full object-cover"
                 src="https://randomuser.me/api/portraits/women/23.jpg"
                 alt=""
            />
            <div class="absolute bg-gray-900 p-1 rounded-full bottom-0 right-0">
              <div class="bg-green-500 rounded-full w-3 h-3"></div>
            </div>
          </div></div><p>Emma</p></div>
          <div class="text-sm text-center mr-4"><div class="p-1 border-4 border-blue-600 rounded-full"><div class="w-16 h-16 relative flex flex-shrink-0">
            <img class="shadow-md rounded-full w-full h-full object-cover"
                 src="https://randomuser.me/api/portraits/men/65.jpg"
                 alt=""
            />
          </div></div><p>Mark</p></div>
          <div class="text-sm text-center mr-4"><div class="p-1 border-4 border-blue-600 rounded-full"><div class="w-16 h-16 relative flex flex-shrink-0">
            <img class="shadow-md rounded-full w-full h-full object-cover"
                 src="https://randomuser.me/api/portraits/women/65.jpg"
                 alt=""
            />
          </div></div><p>Eva</p></div>
          <div class="text-sm text-center mr-4"><div class="p-1 border-4 border-transparent rounded-full"><div class="w-16 h-16 relative flex flex-shrink-0">
            <img class="shadow-md rounded-full w-full h-full object-cover"
                 src="https://randomuser.me/api/portraits/men/31.jpg"
                 alt=""
            />
            <div class="absolute bg-gray-900 p-1 rounded-full bottom-0 right-0">
              <div class="bg-green-500 rounded-full w-3 h-3"></div>
            </div>
          </div></div><p>Max</p></div>
          <div class="text-sm text-center mr-4"><div class="p-1 border-4 border-blue-600 rounded-full"><div class="w-16 h-16 relative flex flex-shrink-0">
            <img class="shadow-md rounded-full w-full h-full object-cover"
                 src="https://randomuser.me/api/portraits/men/81.jpg"
                 alt=""
            />
          </div></div><p>Adam</p></div>
        </div>
        <UsersList users={users} />
      </section>
      <slot/>
    </main>
  </div>
</div>
</div>
<!-- component -->
<style lang="scss" itemscope>
     div.card {
       @apply bg-gray-900;
     }
    /* can be configured in tailwind.config.js */
    .group:hover .group-hover\:block {
        display: block;
    }
    .hover\:w-64:hover {
        width: 45%;
    }


    /* NO NEED THIS CSS - just for custom scrollbar which can also be configured in tailwind.config.js*/
    ::-webkit-scrollbar {
        width: 2px;
        height: 2px;
    }
    ::-webkit-scrollbar-button {
        width: 0px;
        height: 0px;
    }
    ::-webkit-scrollbar-thumb {
        background: #2d3748;
        border: 0px none #ffffff;
        border-radius: 50px;
    }
    ::-webkit-scrollbar-thumb:hover {
        background: #2b6cb0;
    }
    ::-webkit-scrollbar-thumb:active {
        background: #000000;
    }
    ::-webkit-scrollbar-track {
        background: #1a202c;
        border: 0px none #ffffff;
        border-radius: 50px;
    }
    ::-webkit-scrollbar-track:hover {
        background: #666666;
    }
    ::-webkit-scrollbar-track:active {
        background: #333333;
    }
    ::-webkit-scrollbar-corner {
        background: transparent;
    }

</style>