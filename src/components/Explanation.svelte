<script>
  export let dark = false;
  export let cursor = "";
  export let explanations = [];
</script>

<style>
blockquote:after {
  content: '';
  position: absolute;
  width: 0px;
  height: 0px;
  bottom: -12px;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 12px solid #4299e1;
  border-bottom: none;
  margin: auto;
  left: 0px;
  right: 0px;
}
</style>

<blockquote class="w-full mb-5 relative text-center bg-blue-500 py-3 px-4 rounded text-white text-2xl mt-3 select-none">
  <p class="inline-block font-semibold">
    {#if dark}
      <strong class="text-blue-300">"</strong>
      {@html explanations.map(d => `<span class="${cursor === d.type ? 'text-teal-200 underline' : ''}">${d.text}</span>`).join('. ') + '.'}
      <strong class="text-blue-300">"</strong>
    {:else}
      <strong class="text-blue-300">"</strong>
      {@html explanations.map(d => `<span class="${cursor === d.type ? 'text-teal-200 underline' : ''}">${d.text}</span>`).join('. ') + '.'}
      <strong class="text-blue-300">"</strong>
    {/if}
  </p>
</blockquote>