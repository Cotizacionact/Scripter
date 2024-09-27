<script lang="ts">
    import HireAFreeLancer from "./HireAFreeLancer.svelte";
    import type { StateHandler } from "./handlers";
    export let state:number = 0

    let Render:StateHandler ={
        0: HireAFreeLancer
    } 

</script>

<svelte:component this={Render[state]} />