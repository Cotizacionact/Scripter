<script lang="ts">
    import type {Carusel} from "./handlers.ts"
	import CaruselState0 from './CaruselState0.svelte';
    import IoIosArrowBack from 'svelte-icons/io/IoIosArrowBack.svelte'
    import IoIosArrowForward from 'svelte-icons/io/IoIosArrowForward.svelte'
	import CaruselState1 from "./CaruselState1.svelte";
	import CaruselState2 from "./CaruselState2.svelte";
    import Modal from "$lib/components/Modal.svelte";
    let popupModal = false;



    let state:number = 0
    const  handleCarusel:Carusel = {
        0: CaruselState0,
        1: CaruselState1,
        2: CaruselState2
    }

    function moveCarusel(direction:"next"|"back"){
        let max = Object.keys(handleCarusel).length-1
        if(direction === "next"){
            if(state>=max){
                state = 0
            }else{state = state+1}
        }else if(direction=="back"){
            if(state<=0){
                state = max
            }else{state = state -1}
        }

    }

</script>

<main class="relative sm:h-[90vh] bg-sky-50">
    <svelte:component this={Modal} bind:open={popupModal}>
        <h5 class="text-2xl font-bold text-center bg-blue-500 text-white rounded">Under development</h5>
        <div class="flex flex-col sm:flex-row">
            <div class="w-full sm:w-1/2 p-2">
                <p class="text-justify ">We are still under development. Everything you see here is hand coded and has a total recurring cost of 0. Soon we will have a hand made blog section and courses for you</p>
                <h6 class="text-lg font-bold text-center">Comming Soon!</h6>
                <ul class="list-disc px-5 marker:text-green-500">
                    <li>More services!</li>
                    <li>News feed</li>
                    <li>Profiles</li>
                    <li>Blog</li>
                    <li>Courses</li>
                </ul>
                <button class="RedButton p-2 w-full" on:click={()=>popupModal=false}>Close</button>
            </div>
            <img alt="App Scripter under development" src="/Images/website under development.png" class="w-full sm:w-1/2"/>
        </div>
    </svelte:component>
   <svelte:component this={handleCarusel[state]} bind:popupModal={popupModal}></svelte:component>
    <button class="absolute right-0 top-[50%] flex w-10 justify-center bg-black p-0.5 text-white opacity-40 hover:opacity-70" on:click={()=>{moveCarusel("next")}}><IoIosArrowForward/></button>
    <button class="absolute left-0 top-[50%] flex w-10 justify-center bg-black p-0.5 text-white opacity-40 hover:opacity-70" on:click={()=>{moveCarusel("back")}}><IoIosArrowBack></IoIosArrowBack></button>
    <div class="absolute bottom-5 w-full">
        <div class="hidden md:flex w-full space-x-2 justify-center">
            <div  class={`h-2 ${state ===0 ? "w-6 bg-gray-600":"w-4 bg-gray-300"}`}></div>
            <div  class={`h-2 ${state ===1 ? "w-6 bg-gray-600":"w-4 bg-gray-300"}`}></div>
            <div  class={`h-2 ${state ===2 ? "w-6 bg-gray-600":"w-4 bg-gray-300"}`}></div>
        </div>
    </div>
</main>

