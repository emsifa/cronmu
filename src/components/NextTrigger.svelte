<script>
  import { format } from 'date-fns';
  import { id } from 'date-fns/locale';

  export let dark;
  export let times;

  const fmt = (time, fmtString) => format(time, fmtString, {locale: id});

  function renderTime(time, timeFormat, index) {
    if (!index) {
      return `<span class="text-blue-500 font-bold">${fmt(time, timeFormat)}</span>`;
    }

    const timeB = times[index - 1];

    if (fmt(time, timeFormat) !== fmt(timeB, timeFormat)) {
      return `<span class="text-blue-500 font-bold">${fmt(time, timeFormat)}</span>`;
    }

    return fmt(time, timeFormat);
  }
</script>

<style>
  .dark tbody tr:hover td {
    background-color: rgba(0,0,0,.10);
  }
  .light tbody tr:hover td {
    background-color: rgba(0,20,50,.05);
  }
</style>

<div
  class="doc p-0 bg-white rounded mt-4 overflow-hidden shadow"
  class:bg-white={!dark}
  class:text-gray-500={!dark}
  class:bg-gray-800={dark}
  class:text-gray-300={dark}
  class:dark={dark}
  class:light={!dark}
  >
  <table class="w-full">
    <thead class="font-bold">
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
      {#each times as time, i}
      <tr>
        <td
          width="60"
          class="text-right text-sm border px-3 py-2 select-none"
          class:border-gray-900={dark}
          class:border-gray-300={!dark}>
          {@html renderTime(time, 'EEEE', i)}
        </td>
        <td
          class="text-center text-sm border px-3 py-2 select-none"
          class:border-gray-900={dark}
          class:border-gray-300={!dark}>
          {@html renderTime(time, 'dd', i)}
          {@html renderTime(time, 'MMMM', i)}
          {@html renderTime(time, 'yyyy', i)}
        </td>
        <td
          width="60"
          class="text-left text-sm border px-3 py-2 select-none"
          class:border-gray-900={dark}
          class:border-gray-300={!dark}>
          {@html renderTime(time, 'HH', i)}:{@html renderTime(time, 'mm', i)}
        </td>
      </tr>
      {/each}
    </tbody>
  </table>
</div>
