<script>
  import { Link, useLocation } from "svelte-navigator";

  export let selectedView;
  export let views;

  const location = useLocation();
</script>

<header>
  <h1>jupekett's home page</h1>
  <nav>
    {#each views as view, index}
      <div class="wrapper">
        <Link
          to={view.path}
          on:click={() => {
            selectedView = views[index];
          }}
          class="link{view.path === $location.pathname
            ? ' selected a__disabled'
            : ''}">{view.linkText}</Link
        >
      </div>
    {/each}
  </nav>
</header>

<style>
  header {
    padding: 10px;
    text-align: center;
    background-color: black;
    background-image: linear-gradient(rgba(0, 0, 0, 0), black),
      url("../assets/background.jpg");
    background-position: 0;
  }

  header h1 {
    color: white;

    margin: 5px;
    font-size: 2em;

    font-family: "Lucida Sans", monospace;
    text-shadow: -5px 0 5px black, 0 5px 5px black, 5px 0 5px black,
      0 -5px 5px black;
  }

  nav {
    margin: 0 auto;
    max-width: var(--content-width);
    display: flex;
    justify-content: center;
    background-color: #559955;
    font-family: "Lucida Console", monospace;
  }

  .wrapper {
    width: 100%;
  }

/* Link component creates an anchor with class "link".
  :global is needed to apply styles to child components. */
  .wrapper :global(.link) {
    width: 100%;
    padding: 10px;
    background-color: #338833;
    border: 1px solid black;
    text-align: center;
    font-weight: normal;
    display: inline-block;
    text-decoration: none;
    color: white;
  }

  .wrapper :global(.link:hover) {
    background-color: #55aa55;
  }

  .wrapper :global(.selected),
  .wrapper :global(.selected:hover) {
    background-color: #115511;
  }

  @media screen and (max-width: 600px) {
  }
</style>
