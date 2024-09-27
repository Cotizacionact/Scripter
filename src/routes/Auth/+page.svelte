<script lang="ts">
	import { onMount } from 'svelte';
	import Register from "./register.svelte";
	import type {Component} from "$lib"
	import SignIn from "./SignIn.svelte";
	import SignOut from "./SignOut.svelte";
	import type { ActionData } from './$types.js';

	let state:number = 0;
    export let form:ActionData


    export const snapshot = {
        capture: () => state,
        restore:(value) => state = value
    }


	let StateHandler:{[key:number]:Component} = {
		0:SignIn,
		1:Register,
		2:SignOut
	}
</script>

<svelte:component bind:state this={StateHandler[state]} bind:form={form}></svelte:component>
