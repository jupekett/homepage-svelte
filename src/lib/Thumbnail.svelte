<script lang="ts">
  import { fade } from "svelte/transition";
  import type { Project } from "../routes/Portfolio.types";

  function getImageUrl(imagePath: string): string {
    return new URL(`../assets/projects/${imagePath}`, import.meta.url).href;
  }

  export let project: Project;

  const imageUrl = getImageUrl(`${project.id}/original.png`);
  const thumbUrl = getImageUrl(`${project.id}/thumbnail.png`);
  const altText = `Larger image of ${project.name}`;

  let isFocused = false;
  let isZoomed = false;
</script>

<a href={imageUrl} aria-label={altText} title={altText}>
  <img
    src={thumbUrl}
    alt={project.name}
    on:click|preventDefault={() => {
      isFocused = true;
    }}
  />
</a>

{#if isFocused}
  <div
    class="dim-layer"
    transition:fade={{ duration: 150 }}
    on:click={() => {
      isFocused = false;
      isZoomed = false;
    }}
  >
    <img
      src={imageUrl}
      class="img-focused"
      class:isZoomed
      alt={altText}
      on:click|stopPropagation={() => {
        isZoomed = !isZoomed;
      }}
    />
  </div>
{/if}

<!-- Escape key closes the focused image -->
<svelte:window
  on:keyup={(event) => {
    if (event.key === "Escape") {
      isFocused = false;
      isZoomed = false;
    }
  }}
/>

<style>
  img {
    max-width: 100%;
  }

  .img-focused {
    position: fixed;
    max-height: 80vh;
    max-width: 80vw;
    transition: all 0.5s;
  }

  .isZoomed {
    max-height: 100vh;
    max-width: 100vw;
    height: auto;
    width: auto;
  }

  .dim-layer {
    display: grid;
    place-items: center;

    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;

    min-height: 100vh;
    min-width: 100vw;

    background: rgba(0, 0, 0, 0.75);
  }
</style>
