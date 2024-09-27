<script lang="ts">
    export let open:Boolean = false
</script>
{#if open == true}
    <section class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white z-50 rounded border-2 p-2 flex justify-center flex-col">
        <slot></slot>
    
    </section>
{/if}