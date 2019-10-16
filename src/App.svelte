<script>
  import { onMount } from 'svelte';
  import { addMinutes } from 'date-fns';
	import { fade } from 'svelte/transition';
  import Header from './components/Header.svelte';
  import Footer from './components/Footer.svelte';
  import Error from './components/Error.svelte';
  import InputCron from './components/InputCron.svelte';
  import Explanation from './components/Explanation.svelte';
  import NextTrigger from './components/NextTrigger.svelte';

  import Parser from './libs/parser';
  import { findNext } from './libs/find-next';
  import { explainArray } from './libs/explainer';
  import { validate } from './libs/validator';

  export let query;
  export let dark;
  let parsed = null;
  let error = "";
  let cursor = "";
  let explanations = [];
  let nextTriggers = [];
  let time = addMinutes(new Date(), 1);

  onMount(() => {
    const interval = setInterval(() => {
      if (new Date().getSeconds() === 1) {
        time = addMinutes(new Date(), 1);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  function updateCursor(evt) {
    cursor = "";
    if (!parsed) {
      return;
    }

    const pos = evt.detail.cursor;
    const index = parsed.filter(data => data.type != 'ws').findIndex(data => pos >= (data.cursor[0]) && pos <= (data.cursor[1] + 1))

    switch (index) {
      case 0: cursor = "minute"; break;
      case 1: cursor = "hour"; break;
      case 2: cursor = "date"; break;
      case 3: cursor = "month"; break;
      case 4: cursor = "day"; break;
    }
  }

  $: {
    cursor = "";
    error = "";
    parsed = null;
    explanations = [];
    nextTriggers = [];

    try {
      parsed = Parser.parse(query);
      const invalid = validate(parsed);
      if (invalid) {
        throw { message: invalid };
      }

      explanations = explainArray(parsed);
      nextTriggers = findNext(parsed, time);
      window.history.replaceState({query: query}, query, `?query=${query.replace(/ /g, '_')}`);
    } catch (e) {
      error = e.message;
    }
  }
</script>

<main class="w-full h-screen overflow-auto"
  class:bg-gray-200={!dark}
  class:bg-gray-900={dark}>
  <div class="flex h-screen flex-wrap mt-8">
    <div class="w-5/6 md:w-2/6 m-auto">
      <Header dark/>

      {#if explanations.length}
        <Explanation {dark} {explanations} {cursor}/>
      {/if}

      <div class="my-3">
        <InputCron {dark} bind:query={query} {cursor} {parsed} {error} on:cursor={updateCursor}/>
        {#if error}
          <Error message={error} {dark}/>
        {/if}
      </div>

      {#if nextTriggers.length}
        <div transition:fade={{duration: 200}}>
          <NextTrigger times={nextTriggers} {dark}/>
        </div>
      {/if}

      <Footer {dark}/>
    </div>
  </div>
</main>