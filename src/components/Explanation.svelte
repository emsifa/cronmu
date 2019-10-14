<script>
  export let dark = false;
  export let cursor = "";
  export let explanations = [];
</script>

<blockquote class="text-center text-gray-600 text-2xl mt-3 select-none">
  <p class="inline-block font-semibold">
    {#if dark}
      <strong class="text-blue-500">"</strong>
      {@html explanations.map(d => `<span class="${cursor === d.type ? 'text-blue-500 underline' : ''}">${d.text}</span>`).join('. ') + '.'}
      <strong class="text-blue-500">"</strong>
    {:else}
      <strong class="text-blue-500">"</strong>
      {@html explanations.map(d => `<span class="${cursor === d.type ? 'text-blue-500 underline' : ''}">${d.text}</span>`).join('. ') + '.'}
      <strong class="text-blue-500">"</strong>
    {/if}
  </p>
</blockquote>