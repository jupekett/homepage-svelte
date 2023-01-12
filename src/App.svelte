<script lang="ts">
  import { Router, Route } from "svelte-navigator";

  // views
  import Home from "./routes/Home.svelte";
  import Portfolio from "./routes/Portfolio.svelte";
  import Blog from "./routes/Blog.svelte";
  import Playground from "./routes/Playground.svelte";

  // shared components
  import Header from "./lib/Header.svelte";
  import Footer from "./lib/Footer.svelte";

  const views = [
    { name: "Home", component: Home, path: "/" },
    { name: "Portfolio", component: Portfolio, path: "/portfolio" },
    { name: "Blog", component: Blog, path: "/blog" },
  ];

  if (import.meta.env.DEV) {
    views.push({
      name: "Devground",
      component: Playground,
      path: "/devground",
    });
  }
  // TODO error page or route to home when route not found?

  let selectedView = views[0];
  $: document.title = `${selectedView.name} - jupekett`;
</script>

<Router>
  <Header bind:selectedView {views} />
  {#each views as view}
    <Route path={view.path}>
      <svelte:component this={view.component} />
    </Route>
  {/each}
  <Footer />
</Router>
