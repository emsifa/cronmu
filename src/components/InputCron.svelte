<script>
  import { createEventDispatcher } from 'svelte';
  export let query = "* * * * *";
  export let error = "";
  export let dark = false;

  const dispatch = createEventDispatcher();

  const baseClasses = [
    "w-full",
    "border-2",
    "px-4",
    "py-2",
    "rounded",
    "shadow-lg",
    "text-3xl",
    "text-center",
    "font-bold",
  ];

  const darkClasses = [
    "text-gray-300",
    "bg-gray-800",
  ];

  const lightClasses = [
    "text-gray-600",
    "bg-white",
  ];

  let classes = [];

  function triggerCursor(evt) {
    dispatch('cursor', { cursor: evt.currentTarget.selectionEnd });
  }

  $: {
    if (error) {
      classes = baseClasses.concat(["border-red-600"]);
    } else {
      classes = baseClasses.concat(dark
        ? ["border-gray-900", "focus:border-blue-700"]
        : ["border-gray-400", "focus:border-blue-400"]
      );
    }

    if (dark) {
      classes = classes.concat(darkClasses);
    } else {
      classes = classes.concat(lightClasses);
    }
  }
</script>

<div class="input-cron">
  <input
    class={classes.join(' ')}
    on:keyup={triggerCursor}
    on:click={triggerCursor}
    on:blur={() => dispatch('cursor', -1)}
    bind:value={query}/>
</div>
