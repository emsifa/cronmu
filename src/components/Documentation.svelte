<script>
  export let dark;
  export let title;
  export let examples;
</script>

<div
  class="doc p-0 bg-white rounded-b overflow-hidden shadow"
  class:bg-white={!dark}
  class:text-gray-600={!dark}
  class:bg-gray-800={dark}
  class:text-white={dark}
  >
  <table class="w-full select-none">
    <thead class="font-semibold">
      {#if title}
        <tr>
          <td colspan="2" class="text-center py-2">{title}</td>
        </tr>
      {/if}
      <tr>
        <td
          width="100"
          class="sign text-bold text-right border px-3 py-2"
          class:border-gray-900={dark}
          class:border-gray-300={!dark}>
          Contoh
        </td>
        <td class="desc border px-3 py-2"
          class:border-gray-900={dark}
          class:border-gray-300={!dark}>
          Keterangan
        </td>
      </tr>
    </thead>
    <tbody class="text-sm">
      {#each examples as example}
      <tr>
        <td
          class="sign text-right text-blue-500 text-bold text-lg border px-3 py-2"
          class:border-gray-900={dark}
          class:border-gray-300={!dark}>
          {example.example}
        </td>
        <td
          class="desc border px-3 py-2"
          class:border-gray-900={dark}
          class:border-gray-300={!dark}>
          {example.desc}
        </td>
      </tr>
      {/each}
    </tbody>
  </table>
</div>
