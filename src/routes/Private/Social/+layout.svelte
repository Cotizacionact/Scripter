<script lang="ts">

  import SocialService from "$lib/services/SocialService";
import { Icon } from "svelte-icons-pack";
  import { CiCirclePlus } from "svelte-icons-pack/ci";
  
  export let data;
  const {user, imagen, friend_requests} = data;
  let open:boolean = false;
  let open_solicitudes:boolean = false;

  const social = new SocialService();


  
</script>

<header class="w-full flex items-center justify-between bg-[#1d4ed8] p-5 h-[10vh] relative">
  <a href="/Private/Social">
    <img src="/Logo_Original.png" width={100} class="rounded bg-white p-2" alt="Logo"/>
  </a>  
    <button class=" hidden sm:flex space-x-10 justify-evenly text-white items-center hover:bg-blue-800 active:bg-blue-900 p-2 rounded w-32" on:click={()=>open=!open}>
        <img class="rounded-full bg-white w-12 h-12" src={imagen} alt="Imagen de perfil"/>
        <!--
          
        -->
    </button> 
  {#if open}
    <div class="absolute w-1/4 h-30 rounded right-0 top-full bg-gray-300 p-4 flex flex-col space-y-2">
      <a href={`/Private/Social/Perfil/${user}`}> 
        <div class="bg-white rounded w-full p-2 text-xl text-center">
          Mi Perfil
        </div>
      </a>
      <button on:click={()=>open_solicitudes = !open_solicitudes} class="bg-white rounded w-full p-2 text-xl text-center flex items-center justify-evenly">
        <p>Solicitudes de Amistad</p>
        <div class="bg-red-500 rounded-full w-10 h-10 text-white font-bold flex items-center justify-center">{friend_requests.length}</div>
      </button>
      {#if friend_requests && friend_requests.length > 0 && open_solicitudes}
        <div class="bg-white rounded w-full p-2 text-xl text-center">
          {#each friend_requests as request }
            <div class="flex items-center justify-evenly">
              <p>{request.usuario_1_username}</p>
              <button on:click={()=>social.add_friend(request.usuario_1_id)}>
                <Icon className="rounded hover:shadow-md border active:bg-gray-400" color="green" size={30}  src={CiCirclePlus}></Icon>
              </button>
            </div>
          {/each}
        </div>
      {/if}
      <form class="bg-white rounded w-full p-2 text-xl text-center" action="/Private?/logout" method="POST"><button type="submit"><button class="text-red-500 w-full">Cerrar Sesión</button></form> 

    </div>
  {/if}
    <div class="space-y-2 border p-2 rounded sm:hidden">
      <div class="w-8 h-1 bg-white"></div>
      <div class="w-8 h-1 bg-white"></div>
      <div class="w-8 h-1 bg-white"></div>
    </div>

</header>
<slot></slot>