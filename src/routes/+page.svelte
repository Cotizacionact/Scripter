<script>
	import Carusel from "$lib/Public/LandingPage/Carusel/Carusel.svelte";
	import Footer from "$lib/Public/sections/Footer.svelte";
    import PublicNav from "$lib/Public/Navegation/PublicNav.svelte";
    import CaruselState1 from "$lib/Public/LandingPage/Carusel/CaruselState1.svelte";

	function submit(){
    window.location.href = "https://calendar.app.google/2KcsFsXMvwkhfSDn6"
 	}
</script>

<PublicNav/>  
<div class="flex h-[90vh] p-2 px-10 flex-wrap relative">
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
        <button class="GreenButton mt-5 p-2 px-5 w-full mb-5" on:click={submit}>
            Agenda Una Consulta Gratis
        </button>

    </div>

    <div class="flex flex-col w-full md:w-1/2 items-center justify-center p-2">
        <form enctype="multipart/form-data" method="POST" action="?/register"  class="border-2 rounded p-2 sm:w-3/4  bg-white border-blue-300 flex flex-col">
            <h2 class="text-3xl font-bold text-center">Crea tu Cuenta Con Nosotros</h2>
            <input name="nombre" id="nombre" type="text" placeholder="Nombre completo*" required class="SimpleInput"/>
            <input name="email" id="email" type="email" placeholder="Correo electrónico*" required class="SimpleInput"/>
            <input type="password" id="password" name="password" placeholder="Contraseña*" required class="SimpleInput"/>
			<textarea name="bio" id="bio" placeholder="Cuentanos sobre ti*" required class="SimpleInput"></textarea>
            <label for="foto" class="ml-2">Foto de Perfil</label>
            <input required name="foto" id="foto" type="file" class="m-2 p-1" accept=".png, .jpg, .jpeg, .webp">
            <button type="submit" class="GreenButton p-2 mx-2">Crear Cuenta</button>
        </form>
    </div>

</div>
<CaruselState1></CaruselState1>
<Footer></Footer>