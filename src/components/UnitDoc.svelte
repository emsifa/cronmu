<script>
  export let dark;
  export let title;
  export let docs;

  const tdClasses = dark
    ? "border border-gray-900 px-3 py-2"
    : "border border-gray-300 px-3 py-2"

</script>

<div
  class="doc p-0 bg-white rounded mt-4 overflow-hidden shadow"
  class:bg-white={!dark}
  class:text-gray-600={!dark}
  class:bg-gray-800={dark}
  class:text-white={dark}
  >
  <table class="w-full select-none">
    <thead class="font-semibold">
      <tr>
        <td colspan="2" class="text-center py-2">{title}</td>
      </tr>
      <tr>
        <td class={tdClasses + "sign text-bold text-right"}>Contoh</td>
        <td class={tdClasses + "desc"}>Keterangan</td>
      </tr>
    </thead>
    <tbody>
      {#each docs as doc}
      <tr>
        <td class={tdClasses + "sign text-right text-blue-500 text-bold text-lg"}>{doc.example}</td>
        <td class={tdClasses + "desc"}>{doc.desc}</td>
      </tr>
      {/each}
    </tbody>
  </table>
</div>
