<script lang="ts">
    import { enhance } from "$app/forms";
    import Post from "$lib/Private/Post.svelte";


    export let data;
    
    const {publicaciones} = data
    let post = {
        titulo:"",
        descripcion:""
    }
</script>
<div class="h-screen flex">
    <div class="h-full border-r w-3/4">
        
        <!-- Formulario para hacer una publicacion  -->
        <form method="POST" action="?/Publicacion" class="flex flex-col bg-gray-100 p-4 m-4 rounded space-y-2">
            <label class="font-bold" for="titulo">Título</label>
            <input bind:value={post.titulo} class="rounded p-1 border-black border" name="titulo" id="titulo" type="text" placeholder="¿Sobre qué quieres hablar?">
            {#if post.titulo != ""}
                <label class="font-bold" for="Descripción">Descripción</label>
                <textarea bind:value={post.descripcion} class="rounded p-1 border-black border" name="descripción" id="descripción" placeholder="Escribe lo que quieres compartir aquí"></textarea>
            {/if}
            <button type="submit" class="bg-green-500 rounded p-2 text-white">Compartir</button>
        </form>
        <div>
            {#each publicaciones as publicacion }
               <Post {publicacion}></Post>
            {/each}
        </div>

    </div>
    <div class="h-full w-1/4 p-4 flex flex-col space-y-2">
        <div class="flex items-center bg-sky-600 hover:bg-sky-700 active:bg-sky-900 w-full rounded p-2">
            <img class="w-1/5" src="https://cdn-icons-png.flaticon.com/512/4927/4927725.png" alt="Amigos"/> 
            <p class=" w-4/5 ml-2 pl-2 border-l  text-white text-2xl">Amigos</p>
        </div>

        <div class="flex items-center bg-sky-600 hover:bg-sky-700 active:bg-sky-900 w-full rounded p-2">
            <img class="w-1/5" src="https://cdn-icons-png.flaticon.com/512/164/164426.png" alt="Amigos"/> 
            <p class=" w-4/5 ml-2 pl-2 border-l  text-white text-2xl">Mis Servicios</p>
        </div>

    </div>
</div>