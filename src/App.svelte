<script>
  import { Router } from "@sveltech/routify";
  import { routes } from "@sveltech/routify/tmp/routes";
</script>

<svelte:head>
  <title>ProblemX</title>
  <meta name="description" content="create, find and solve problems">
  <meta name="keywords" content="ProblemX, HackNU2.0, ExpressGradient, SvelteJS, Routify">
  <meta name="author" content="ExpressGradient">
</svelte:head>

<Router {routes} />