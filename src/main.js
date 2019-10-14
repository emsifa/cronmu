import queryString from 'query-string';
import App from './App.svelte';
import './tailwind.css';

const queries = queryString.parse(location.search);

const app = new App({
  target: document.body,
  props: {
    dark: new Date().getHours() >= 18,
    query: queries.query ? queries.query.replace(/_/g, ' ') : "* * * * *"
  }
});

export default app;