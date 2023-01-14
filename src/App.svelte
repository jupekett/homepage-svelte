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

  const needToTryThingsOut = false;
  if (import.meta.env.DEV && needToTryThingsOut) {
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
      <div id="container-middle">
        <div id="left-side" />
        <svelte:component this={view.component} />
        <div id="right-side" />
      </div>
    </Route>
  {/each}
  <Footer />
</Router>

<style>
  #container-middle {
    display: flex;
    flex-grow: 1;
  }

  #left-side {
    background: linear-gradient(
      to right,
      var(--background-color-dark) 0%,
      var(--background-color-lightest) 60%
    );
    flex-grow: 1;
  }

  #right-side {
    background: linear-gradient(
      to left,
      var(--background-color-dark) 0%,
      var(--background-color-lightest) 60%
    );
    flex-grow: 1;
  }

</style>
