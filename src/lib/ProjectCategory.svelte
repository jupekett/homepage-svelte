<script lang="ts">
  import ProjectCard from "./ProjectCard.svelte";
  import { mdToHtml } from "./helpers";
  import type { ProjectCategory } from "../routes/Portfolio.types";

  export let category: ProjectCategory;

  const description = mdToHtml(category.description);
</script>

<section id={category.id}>
  <h2 class="centered-vertical margin-top">{category.name}</h2>

  {#if category.description}
    {@html description}
  {/if}

  {#each category.projects as project}
    <ProjectCard {project} />
  {/each}
</section>

<style></style>
