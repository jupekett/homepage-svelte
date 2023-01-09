<script lang="ts">
  import ProjectCard from "./ProjectCard.svelte";
  import { mdToHtml } from "./helpers";
  import type { ProjectCategory } from "../routes/Portfolio.types";

  export let category: ProjectCategory;
</script>

<section id={category.id}>
  <h2 class="centered-vertical margin-top">{category.name}</h2>

  {#if category.description}
    {#await mdToHtml(category.description) then categoryDescription}
      {@html categoryDescription}
    {/await}
  {/if}

  {#each category.projects as project}
    <ProjectCard {project} />
  {/each}
</section>

<style></style>
