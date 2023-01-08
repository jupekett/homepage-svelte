<script>
  import { Router, Link, Route } from 'svelte-navigator'

  // views
  import Home from "./routes/Home.svelte";
  import Portfolio from "./routes/Portfolio.svelte";
  import Blog from "./routes/Blog.svelte";

  // other components
  import Header from "./lib/Header.svelte";
  import Footer from "./lib/Footer.svelte";

  const views = [
    { name: "Home", component: Home },
    { name: "Portfolio", component: Portfolio },
    { name: "Blog", component: Blog },
  ];

  let selectedView = views[0];
  $: document.title = `${selectedView.name} - jupekett`

  // TODO setup routes -> new logic for Header and view selection
</script>


<Header bind:selectedView {views} />
<svelte:component this={selectedView.component} />
<Footer />

<style></style>
