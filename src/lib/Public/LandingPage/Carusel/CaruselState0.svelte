<script lang="ts">
 export let popupModal:Boolean

 let datos = {
    nombre:"",
    email:"",
    situacion:""
 }

 function submit(){
    window.location.href = "https://calendar.app.google/2KcsFsXMvwkhfSDn6"
 }

</script>
<div class="flex h-full p-2 px-10 flex-wrap relative">



    <div class="w-full md:w-1/2 p-2 flex flex-col items-center justify-center">
            <h1 class="text-5xl font-bold text-center leading-normal tracking-widest"> 
                <span class="p-1 bg-[#1C64F2] text-white rounded">
                    Crea aplicaciones
                </span> 
                hechas a la medida
           
            </h1>
        <div class="flex items-center">
            <img alt="tailor made websites, tailor made web aplications" src="/Images/tailor takeing measurments.png" class="lg:w-1/4"/>
            <h2 class="mt-2 text-xl  text-justify w-3/4 p-4">
                Tener una presencia en línea, o contar con software de automatización provee muchas ventajas. Como permitir que tus clientes reciban actualizaciones de sus servicios, comprar directamente desde tu página, o ahorrar tiempo en trabajos repetitivos. Permítenos guiarte en el proceso de realizar tu aplicación a la medida.
            </h2>
        </div>
        <button class="GreenButton mt-5 p-2 px-5 w-full mb-5" on:click={() => (popupModal = true)}>
            Guia de Trabajo
        </button>

    </div>

    <div class="flex flex-col w-full md:w-1/2 items-center justify-center p-2">
        <form on:submit={submit} class="border-2 rounded p-2 sm:w-3/4  bg-white border-blue-300 flex flex-col">
            <h2 class="text-3xl font-bold text-center">¿Interesado en una consulta gratuita?</h2>
            <input bind:value={datos.nombre} type="text" placeholder="Nombre completo*" required class="SimpleInput"/>
            <input bind:value={datos.email} type="email" placeholder="Correo electrónico*" required class="SimpleInput"/>
            <textarea bind:value={datos.situacion} placeholder="¿Cuál es tu situación?" required class="SimpleInput"></textarea>
            <button type="submit" class="GreenButton p-2 mx-2">Agendar una consulta</button>
        </form>

       
    </div>

</div>