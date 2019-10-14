<script>
	import { fade } from 'svelte/transition';
  import Header from './components/Header.svelte';
  import Footer from './components/Footer.svelte';
  import Error from './components/Error.svelte';
  import InputCron from './components/InputCron.svelte';
  import Explanation from './components/Explanation.svelte';
  import MinuteDoc from './components/MinuteDoc.svelte';
  import HourDoc from './components/HourDoc.svelte';
  import DateDoc from './components/DateDoc.svelte';
  import MonthDoc from './components/MonthDoc.svelte';
  import DayDoc from './components/DayDoc.svelte';

  import Parser from './libs/parser';
  import { explainArray } from './libs/explainer';
  import { validate } from './libs/validator';

  export let query;
  export let dark;
  let parsed = null;
  let error = "";
  let cursor = "";
  let explanations = [];

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

    try {
      parsed = Parser.parse(query);
      const invalid = validate(parsed);
      if (invalid) {
        throw { message: invalid };
      }
      explanations = explainArray(parsed);
      window.history.replaceState({query: query}, query, `?query=${query.replace(/ /g, '_')}`);
    } catch (e) {
      error = e.message;
    }
  }
</script>

<main class="w-full h-screen overflow-auto" class:bg-gray-200={!dark} class:bg-gray-900={dark}>
  <div class="flex h-screen flex-wrap mt-8 md:mt-0 md:content-center justify-center">
    <div class="w-5/6 md:w-2/6">
      <Header dark/>
      <div class="mb-3">
        <InputCron {dark} bind:query={query} error={error} on:cursor={updateCursor}/>
        {#if error}
          <Error message={error} {dark}/>
        {/if}
      </div>

      {#if explanations.length}
        <Explanation {dark} {explanations} {cursor}/>
      {/if}

      {#if cursor}
        <div transition:fade={{duration: 200}}>
          {#if cursor == 'minute'}
            <MinuteDoc {dark}/>
          {:else if cursor == 'hour'}
            <HourDoc {dark}/>
          {:else if cursor == 'date'}
            <DateDoc {dark}/>
          {:else if cursor == 'month'}
            <MonthDoc {dark}/>
          {:else if cursor == 'day'}
            <DayDoc {dark}/>
          {/if}
        </div>
      {/if}

      <Footer {dark}/>
    </div>
  </div>
</main>