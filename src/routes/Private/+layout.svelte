<header class="w-full flex items-center justify-between bg-[#1d4ed8] p-5 h-[10vh]">
  <a href="/">
    <img src="/Logo_Original.png" width={100} class="rounded bg-white p-2" alt="Logo"/>
  </a>  
    <div class=" hidden sm:flex w-1/3 justify-evenly text-white items-center">

        <form action="/Private?/logout" method="POST"><button type="submit"  class="bg-white text-black p-2 rounded-xl">Logout</button></form>
    </div> 
    <div class="space-y-2 border p-2 rounded sm:hidden">
      <div class="w-8 h-1 bg-white"></div>
      <div class="w-8 h-1 bg-white"></div>
      <div class="w-8 h-1 bg-white"></div>
    </div>

</header>
<slot></slot>