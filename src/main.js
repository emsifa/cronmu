import queryString from 'query-string';
import App from './App.svelte';
import './tailwind.css';

const queries = queryString.parse(location.search);
const hour = new Date().getHours();

const app = new App({
  target: document.body,
  props: {
    dark: queries.dark == 1 ? true : hour >= 18 || hour <= 6,
    query: queries.query ? queries.query.replace(/_/g, ' ') : "* * * * *"
  }
});

export default app;