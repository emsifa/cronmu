<script>
  import Documentation from './Documentation.svelte';
  import examples from '../data/examples';
  import { createEventDispatcher } from 'svelte';
  export let query = "* * * * *";
  export let error = "";
  export let cursor = "";
  export let dark = false;
  export let parsed = null;

  let focus = false;
  let input;

  const dispatch = createEventDispatcher();

  const types = [
    {"name": "minute", "label": "MENIT"},
    {"name": "hour", "label": "JAM"},
    {"name": "date", "label": "TGL"},
    {"name": "month", "label": "BULAN"},
    {"name": "day", "label": "HARI"},
  ];

  const baseClasses = [
    "w-full",
    "border-2",
    "px-4",
    "py-2",
    "text-3xl",
    "text-center",
    "font-bold",
  ];

  const darkClasses = [
    "text-gray-300",
    "bg-gray-800",
  ];

  const lightClasses = [
    "text-gray-500",
    "bg-white",
  ];

  let classes = [];

  function selectType(type) {
    if (!parsed) {
      return;
    }

    let data;
    switch (type) {
      case 'minute': data = parsed[0]; break;
      case 'hour': data = parsed[2]; break;
      case 'date': data = parsed[4]; break;
      case 'month': data = parsed[6]; break;
      case 'day': data = parsed[8]; break;
      default: return;
    }

    const cursor = data.cursor;
    dispatch('cursor', { cursor: cursor[0] });
    setTimeout(() => {
      input.focus();
      input.setSelectionRange(cursor[0], cursor[1] + 1);
    }, 50);
  }

  function triggerCursor(evt) {
    dispatch('cursor', { cursor: evt.currentTarget.selectionEnd });
  }

  function onFocus() {
    focus = true;
  }

  function onBlur(evt) {
    focus = false;
  }

  $: {
    if (error) {
      classes = baseClasses.concat(["border-red-500"]);
    } else {
      classes = baseClasses.concat(dark
        ? ["border-gray-800", "focus:border-blue-700"]
        : ["border-gray-400", "focus:border-blue-400"]
      );
    }

    if (parsed) {
      classes.push('rounded-t');
    } else {
      classes.push('rounded');
    }

    if (dark) {
      classes = classes.concat(darkClasses);
    } else {
      classes = classes.concat(lightClasses);
    }
  }
</script>

<style>
.tab-types {
  font-size: .75rem;
}
</style>

<div class="input-cron" class:shadow-lg={focus}>
  <input
    bind:this={input}
    class={classes.join(' ')}
    on:focus={onFocus}
    on:keyup={triggerCursor}
    on:click={triggerCursor}
    on:blur={onBlur}
    bind:value={query}/>

  {#if parsed}
    <div class="tab-types flex overflow-hidden pt-2 -mt-2 select-none"
      class:bg-blue-500={focus}
      class:rounded-b={!cursor}>
      {#each types as type}
        <div
          on:click={() => selectType(type.name)}
          class="w-1/5 px-2 py-1 text-center hover:bg-teal-500 hover:text-white cursor-pointer"
          class:text-gray-600={!dark && cursor !== type.name}
          class:bg-gray-400={!dark && cursor !== type.name}
          class:text-gray-300={dark && cursor !== type.name}
          class:bg-gray-700={dark && cursor !== type.name}
          class:bg-blue-500={cursor === type.name}
          class:text-white={cursor === type.name}>
          {type.label}
        </div>
      {/each}
    </div>
  {/if}

  {#if cursor}
    <div class="mt-0 border-2 overflow-hidden rounded-b overflow-hidden"
      class:border-gray-400={!dark && !focus}
      class:border-gray-800={dark && !focus}
      class:border-blue-500={focus}>
      <Documentation examples={examples[cursor]} {dark}/>
    </div>
  {/if}
</div>
