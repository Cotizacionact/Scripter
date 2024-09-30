<script>
    import Post from "$lib/Private/Post.svelte";
    import { Icon } from "svelte-icons-pack";
    import { BsCameraFill } from "svelte-icons-pack/bs";
    import { RiUserFacesUserAddFill } from "svelte-icons-pack/ri";
    export let data;
    const {user, publicaciones} = data;
</script>

<div class="m-10 bg-gray-100 rounded p-5 flex items-start">
    <div class="rounded-full w-1/4  bg-gray-300 flex justify-center items-end relative overflow-hidden">
        <div class="h-32 w-64 rounded-full rounded-t-none hover:bg-black hover:bg-opacity-80 text-white flex justify-center p-2 text-3xl text-opacity-0 hover:text-opacity-80 absolute">
            <Icon src={BsCameraFill}></Icon>
        </div>

        <img class="object-scale-down h-full w-full" src={user?.imagen} alt="Imagen de Perfil">


    </div>
    <div class="p-4 bg-white rounded m-4 w-full">
        {#if user}

            <div class="flex items-center space-x-4">
                <h3 class="text-4xl font-bold">{user.username}</h3>
                <button class="bg-green-500 text-white p-2 rounded flex items-center space-x-2 font-bold"> <Icon src={RiUserFacesUserAddFill} /> <p>Agregar Amigo</p></button>
            </div>
            <p class="p-4">{user.bio}</p>
                
        {/if}
    </div>
</div>
{#each publicaciones as publicacion }
    <Post  {publicacion} ></Post>
{/each}