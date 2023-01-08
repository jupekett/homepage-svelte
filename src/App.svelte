<script>
  import { Router, Route } from "svelte-navigator";

  // views
  import Home from "./routes/Home.svelte";
  import Portfolio from "./routes/Portfolio.svelte";
  import Blog from "./routes/Blog.svelte";

  // other components
  import Header from "./lib/Header.svelte";
  import Footer from "./lib/Footer.svelte";

  const views = [
    { name: "Home", component: Home, path: "/" },
    { name: "Portfolio", component: Portfolio, path: "portfolio" },
    { name: "Blog", component: Blog, path: "blog" },
  ];

  let selectedView = views[0];
  $: document.title = `${selectedView.name} - jupekett`;

  // TODO setup routes -> new logic for Header and view selection
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
