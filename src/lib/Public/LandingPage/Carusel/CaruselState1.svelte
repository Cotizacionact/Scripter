<script lang="ts">
    import { current_services } from "$lib/data/services";
    import type { service } from "../../../../app";
    
    const services:service[] = current_services;


</script>

<div class="p-2">

    <h2 class="text-5xl text-center font-bold">Nuestros Servicios</h2>
    <div class="flex justify-evenly mt-4">
        {#each services as service}
        <div class="flex flex-col border w-3/12 bg-white rounded shadow-lg">
            <h3 class="text-center font-bold text-xl">
                {service.title}
            </h3>
            <img class="p-2 rounded-xl 2xl:h-full h-72" src={service.image} alt={service.image_alt}>
            <p class="text-justify px-2 flex-grow">{service.description}</p>
            <a href={service.url} class="w-full p-2">
                <button class="bg-green-500 p-2 text-white rounded w-full">Ver mas</button>
            </a>
        </div>
        {/each}
    </div>
</div>