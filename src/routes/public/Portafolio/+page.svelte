<script lang="ts">
    import {portafolio} from "$lib/data/portafolio"

</script>

{#each portafolio as project}
    <div class="rounded shadow-md p-5 border m-10">
        <h1 class="font-bold text-2xl my-2">{project.title}</h1>
        {#if project.video == undefined}
            <div class="flex space-x-5">
                <img src={project.image} alt={project.alt} class="contain rounded w-1/4">

                <div class="flex flex-col justify-between h-full space-y-10">
                    <p class="border-b shadow-b-md rounded">{project.description}</p>
                    <a class="bg-green-500 text-white text-lg hover:bg-green-700 active:bg-green-900 p-2 rounded text-center w-1/6" href={project.url} >Ver Más</a>
                </div>
            </div>
        {:else}
            <div class="flex justify-center">
                <iframe width="600" height="500" src={project.video} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
            <div class="flex justify-center mt-5">
                <a href={project.url} class="text-white rounded bg-green-500 p-2 w-40 text-center hover:bg-green-700 active:bg-green-900">Get Code</a>
            </div>
        {/if}
    </div>
{/each}