<script lang="ts">
	import { enhance } from "$app/forms";
	import type { ActionData } from "./$types";

    export let state:number
    export let form:ActionData;
</script>

<main class="flex justify-center">
    <form action="?/register" method="POST" use:enhance class="shadow-md flex flex-col md:w-1/4 border rounded my-2 p-2 space-y-2">
        <h1 class="font-bold text-2xl">Register</h1>
        <label for="email">Email</label>
        <input class="shadow-sm rounded border p-1"  type="text" name="email" id="email" placeholder="Type your email"/>
        <label for="password">Password</label>
        <input class="shadow-sm rounded border p-1" type="password" name="password" id="password" placeholder="Password"/>
        <button type="submit" class="shadow-sm hover:shadow-md active:shadow-lg bg-green-500 text-white p-2 rounded hover:bg-green-700 active:bg-green-900">Sign Up</button>
        <p>Already have an account? <a on:click={()=>state=0} class="text-blue-500 underline">Login</a></p> 
        {#if form?.error}
            <div class="text-red-500 text-center">{form.message}</div>
        {/if}
    </form>
</main>