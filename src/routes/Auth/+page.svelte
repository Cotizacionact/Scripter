<script lang="ts">
	import type {Component} from "$lib"
	import SignIn from "./SignIn.svelte";
	import type { ActionData } from './$types.js';
    import PublicNav from '$lib/Public/Navegation/PublicNav.svelte';

	let state:number = 0;
    export let form:ActionData


    export const snapshot = {
        capture: () => state,
        restore:(value) => state = value
    }


	let StateHandler:{[key:number]:Component} = {
		0:SignIn,
	}
</script>
<PublicNav></PublicNav>
<svelte:component bind:state this={StateHandler[state]} bind:form={form}></svelte:component>
