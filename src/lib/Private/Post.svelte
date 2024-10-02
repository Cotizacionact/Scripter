<script lang="ts">
    import type { Comment, Post } from "../../app";
    import { SlLike } from "svelte-icons-pack/sl";
    import { BiCommentDetail } from "svelte-icons-pack/bi";
    import { Icon } from "svelte-icons-pack";
    let comentarios:Comment[] = []
    
    export let publicacion:Post

    async function handleComment(event:SubmitEvent){

        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        

        formData.append("Post ID",  publicacion.id);
        formData.append("Comentarios", String(publicacion.comentarios))

        const new_comment =  await fetch("/Private/Social?/Comentario",{
            method:"POST",
            body:formData,
            headers: {
                'x-sveltekit-action': 'true'
            }
        })
        
        publicacion.comentarios++
        const req = await new_comment.json()
        const req_data = JSON.parse(req.data)
        console.log(req_data)

        comentarios = [{
            id:req_data[1],
            texto: formData.get("text") as string,
            usuario:req_data[2],
            usuario_id:req_data[3],
            likes:0,
            comentarios:false
        },...comentarios]

    }

    async function loadComments(event:Event){
        const formData = new FormData();
        formData.append("Post ID", publicacion.id);
        const req = await fetch("/Private/Social?/getComentarios",{
            method:"POST",
            body:formData,
            headers: {
                'x-sveltekit-action': 'true'
            }
        })

        const json = await req.json()
        const coments = JSON.parse(JSON.parse(json.data)[0])
        comentarios = [...coments,...comentarios]
    }

    async function addLike(event:Event){
        const formData = new FormData();
        formData.append("Post ID", publicacion.id);
        formData.append("First Likes", JSON.stringify(publicacion.first_likes))
        const req = await fetch("/Private/Social?/Like",{
            method:"POST",
            body:formData,
            headers: {
                'x-sveltekit-action': 'true'
            }
        })
    }
</script>

<div class="m-4 p-4 rounded border shadow-md">
    <div>
        <h4 class="font-bold text-lg">{publicacion.titulo}</h4>
        <p class="font-bold text-gray-500">Autor: {publicacion.usuario}</p>
    </div>
    <p class="border rounded p-2">{publicacion.descripcion}</p>
    <div class="flex my-2 space-x-2">
        <button on:click={addLike} class="bg-green-500 rounded p-2 text-white flex items-center w-32 justify-evenly hover:bg-green-700 active:bg-green-900"> {publicacion.likes} <Icon src={SlLike}/>  Me gusta </button>
        <button on:click={loadComments} class="bg-blue-500 rounded p-2 text-white flex items-center w-36 justify-evenly hover:bg-blue-700 active:bg-blue-900"> {publicacion.comentarios} <Icon src={BiCommentDetail}/> Comentarios</button>
        <form action="/" on:submit={handleComment} class="w-10/12 space-x-2 flex">
            <input type="text" name="text" id="text" class="h-full w-full rounded border-black border p-1" placeholder="Escribe tu comentario">
            <button type="submit" class="bg-blue-500 rounded p-2 text-white flex items-center w-36 justify-evenly hover:bg-blue-700 active:bg-blue-900">Enviar</button>
        </form>
    </div>
    {#each comentarios as comentario}
        <div class="border-black border-l p-1">
            <a href={`/Private/Social/Perfil/${comentario.usuario_id}`} class="font-bold text-gray-500 hover:underline">{comentario.usuario}</a>
            <p>{comentario.texto}</p>
        </div>
    {/each}
</div>