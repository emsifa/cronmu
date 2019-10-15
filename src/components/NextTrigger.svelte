<script>
  import { format } from 'date-fns';
  import { id } from 'date-fns/locale';

  export let dark;
  export let times;

  const fmt = (time, fmtString) => format(time, fmtString, {locale: id});
</script>

<style>
  tbody tr:hover td {
    background-color: rgba(0,0,0,.10);
  }
</style>

<div
  class="doc p-0 bg-white rounded mt-4 overflow-hidden shadow"
  class:bg-white={!dark}
  class:text-gray-600={!dark}
  class:bg-gray-800={dark}
  class:text-white={dark}
  >
  <table class="w-full">
    <thead class="font-semibold">
      <tr>
        <td colspan="3" class="text-center py-2">TRIGGER SELANJUTNYA</td>
      </tr>
      <tr>
        <td
          class="text-right text-bold text-lg border px-3 py-2 select-none"
          class:border-gray-900={dark}
          class:border-gray-300={!dark}>
          Hari
        </td>
        <td
          class="text-center text-bold text-lg border px-3 py-2 select-none"
          class:border-gray-900={dark}
          class:border-gray-300={!dark}>
          Tanggal
        </td>
        <td
          class="text-left text-bold text-lg border px-3 py-2 select-none"
          class:border-gray-900={dark}
          class:border-gray-300={!dark}>
          Jam
        </td>
      </tr>
    </thead>
    <tbody>
      {#each times as time}
      <tr>
        <td
          width="30"
          class="text-right text-bold text-sm border px-3 py-2 select-none text-blue-500"
          class:border-gray-900={dark}
          class:border-gray-300={!dark}>
          {fmt(time, 'EEEE')}
        </td>
        <td
          width="40"
          class="text-center text-bold text-sm border px-3 py-2 select-none"
          class:border-gray-900={dark}
          class:border-gray-300={!dark}>
          {fmt(time, 'dd MMMM yyyy')}
        </td>
        <td
          width="30"
          class="text-left text-bold text-sm border px-3 py-2 select-none text-blue-500"
          class:border-gray-900={dark}
          class:border-gray-300={!dark}>
          {fmt(time, 'HH:mm')}
        </td>
      </tr>
      {/each}
    </tbody>
  </table>
</div>
