<script lang="ts">
    import Modal from "$lib/components/Modal.svelte";

    let show:boolean = false;
    let show_modal:boolean = false;
    function handle_modal(){
      show_modal = !show_modal
    }

</script>

<header class="w-full flex items-center justify-between bg-[#1d4ed8] p-5 h-[10vh]">
  <a href="/">
    <img src="/Logo_Original.png" width={100} class="rounded bg-white p-2" alt="Logo"/>
  </a>  
    <div class=" hidden sm:flex w-1/3 justify-evenly text-white items-center">
        <a href="/public/Portafolio">Portafolio</a>
        <p>Services</p>
        <button on:click={handle_modal}>Blog</button>
        <p>About Us</p>
        <a href="/Auth" class="bg-white text-black p-2 rounded-xl">Login</a>
    </div> 
    <div class="space-y-2 border p-2 rounded sm:hidden">
      <div class="w-8 h-1 bg-white"></div>
      <div class="w-8 h-1 bg-white"></div>
      <div class="w-8 h-1 bg-white"></div>
    </div>
    {#if show === true}
    <div class="absolute w-1/3 bg-white border right-0 bottom-[-100%] rounded p-2">
      <p class="border-b text-center hover:bg-gray-200 hover:rounded">Portafolio</p>
      <p class="border-b text-center hover:bg-gray-200 hover:rounded">Services</p>
      <p class="border-b text-center hover:bg-gray-200 hover:rounded">Blog</p>
      <p class="border-b text-center hover:bg-gray-200 hover:rounded">About Us</p>
      <a href="/Auth"> <p class="text-center bg-green-500 hover:bg-green-700 rounded font-bold text-white">Login</p></a>
    </div>
   {/if} 
</header>

<Modal open={show_modal}>
  <h3 class="text-lg font-bold text-center">
    Gracias por interesarte en nuestro blog
  </h3>
  <p class="">
    Actualmente este se encuentra en desarollo pero puedes ver los que
    llevamos en linkedin.
  </p>
  <a class="text-blue-500 underline" href="https://www.linkedin.com/pulse/aprendiendo-desarrollo-web-desde-cero-en-2024-gomez-bra%C3%B1a-gonzalez-mb8cc/?trackingId=KxoFvTibQ4S3FNXoWzFhXw%3D%3D">
    Aprende Desarrollo Web Desde Cero
  </a>
  <a class="text-blue-500 underline" href="https://www.linkedin.com/pulse/aprendiendo-html-desde-cero-jesus-gomez-bra%C3%B1a-gonzalez-otkdc/?trackingId=bzsM0DMKTS60uttPh9VaBQ%3D%3D">
    Aprendiendo HTML desde Cero
  </a>
</Modal>