<script>
  export let selectedView;
  export let views;
</script>

<header>
  <h1>{selectedView.name}</h1>
  <nav>
    {#each views as view, index}
      <button
        id="button-{view.name.toLowerCase()}"
        value={index}
        on:click={() => {
          selectedView = views[index];
        }}
        class={view.name === selectedView.name ? "selected" : ""}
        >{view.name}</button
      >
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

  nav button {
    width: 100%;
    padding: 10px;
    background-color: #338833;
    color: white;
    border: 1px solid black;
    text-align: center;
    font-weight: normal;
    display: inline-block;
    text-decoration: none;
  }

  nav button:hover {
    background-color: #55aa55;
  }

  nav .selected,
  nav .selected:hover {
    background-color: #115511;
  }

  @media screen and (max-width: 600px) {
    nav {
      width: 100%;
    }
  }
</style>
