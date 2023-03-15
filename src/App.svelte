<script lang="ts">
  import { Router, Route } from "svelte-navigator";

  // views
  import Home from "./routes/Home.svelte";
  import Portfolio from "./routes/Portfolio.svelte";
  import Blog from "./routes/Blog.svelte";
  import Playground from "./routes/Playground.svelte";
  import Empty from "./routes/Empty.svelte";

  // shared components
  import Header from "./lib/Header.svelte";
  import Footer from "./lib/Footer.svelte";

  const views = [
    {
      path: "/",
      linkText: "Home",
      component: Home,
    },
    {
      path: "/portfolio",
      linkText: "Portfolio",
      component: Portfolio,
    },
    { path: "/blog", linkText: "Blog", component: Blog },
  ];

  const needToTryThingsOut = false;
  if (import.meta.env.DEV && needToTryThingsOut) {
    views.push({
      linkText: "Devground",
      component: Playground,
      path: "/devground",
    });
  }

  let selectedView = views[0];
  $: document.title = `${selectedView.linkText} - jupekett`;
</script>

<Router basepath="/homepage-svelte">
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
  <Route>
    <div id="container-middle">
      <div id="left-side" />
      <svelte:component this={Empty} />
      <div id="right-side" />
    </div>
  </Route>
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
