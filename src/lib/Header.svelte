<script>
  import { Link } from "svelte-navigator";
  export let selectedView;
  export let views;
</script>

<header>
  <h1>{selectedView.name}</h1>
  <nav>
    {#each views as view, index}
      <div class="wrapper">
        <Link
          to={view.path}
          on:click={() => {
            selectedView = views[index];
          }}
          class="link{view.name === selectedView.name ? ' selected' : ''}"
          >{view.name}</Link
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
      url("../assets/code-blur-half.jpg");
    background-position: 0;
  }

  header h1 {
    display: inline-block;
    width: fit-content;
    padding: 5px 10px;
    color: white;
    text-shadow: -5px 0 5px black, 0 5px 5px black, 5px 0 5px black,
      0 -5px 5px black;
  }

  nav {
    margin: 0 auto;
    max-width: 600px;
    display: flex;
    justify-content: center;
    background-color: #559955;
  }

  .wrapper {
    width: 100%;
  }

  /* Link component doesn't understand CSS classes without this syntax */
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
    nav {
      width: 100%;
    }
  }
</style>
