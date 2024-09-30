<script lang="ts">
    import type { Post } from "../../app";
    import { SlLike } from "svelte-icons-pack/sl";
    import { BiCommentDetail } from "svelte-icons-pack/bi";
    import { Icon } from "svelte-icons-pack";
    
    export let publicacion:Post
</script>

<div class="m-4 p-4 bg-gray-100 rounded">
    <div>
        <h4 class="font-bold text-lg">{publicacion.titulo}</h4>
        <p class="font-bold text-gray-500">Autor: {publicacion.usuario}</p>
    </div>
    <p class="border border-black rounded p-2">{publicacion.descripcion}</p>
    <div class="flex my-2 space-x-2">
        <button class="bg-green-500 rounded p-2 text-white flex items-center w-32 justify-evenly hover:bg-green-700 active:bg-green-900"> {publicacion.likes.length} <Icon src={SlLike}/>  Me gusta </button>
        <button class="bg-blue-500 rounded p-2 text-white flex items-center w-36 justify-evenly hover:bg-blue-700 active:bg-blue-900"> {publicacion.comentarios.length} <Icon src={BiCommentDetail}/> Comentarios</button>
        <form action="" class="w-10/12 space-x-2 flex">
            <input type="text" name="" id="" class="h-full w-full rounded border-black border p-1" placeholder="Escribe tu comentario">
            <button class="bg-blue-500 rounded p-2 text-white flex items-center w-36 justify-evenly hover:bg-blue-700 active:bg-blue-900">Enviar</button>
        </form>
    </div>
    {#each publicacion.comentarios as comentario}
        <div class="border-black border-l p-1">
            <p class="font-bold text-gray-500">{comentario.usuario}</p>
            <p>{comentario.texto}</p>
        </div>
    {/each}
</div>