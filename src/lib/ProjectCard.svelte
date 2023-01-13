<script lang="ts">
  import { mdToHtml } from "./helpers";
  import Thumbnail from "./Thumbnail.svelte";
  import type { Project } from "../routes/Portfolio.types";

  function getProjectFileUrl(path: string): string {
    return new URL(path, import.meta.url).href;
  }

  function getImageUrl(project: string): string {
    return getProjectFileUrl(`../assets/projects/${project}/original.png`);
  }

  function getThumbnailUrl(project: string): string {
    return getProjectFileUrl(`../assets/projects/${project}/thumbnail.png`);
  }

  export let project: Project;

  const description = mdToHtml(project.description);
  const imageUrl = getImageUrl(project.id);
  const thumbnailUrl = getThumbnailUrl(project.id);
</script>

<article class="project-card">
  <div class="project-content">
    <section class="project-info">
      <h3 class="project-heading">{project.name}</h3>

      {@html description}

      <ul>
        {#if project.liveAddress || project.downtimeReason}
          <li>
            {#if !project.downtimeReason}
              <a href={project.liveAddress}>Live application</a>
            {:else}
              Application offline: {project.downtimeReason}
            {/if}
          </li>
        {/if}
        <li>
          <a href={project.repository}>Source code</a>
        </li>
      </ul>
    </section>

    <Thumbnail {project} />
  </div>
</article>

<style>
  .project-content {
    display: flex;
    align-items: center;
  }

  .project-card {
    margin: 1em 0;
    padding: 1em;

    background-color: var(--background-color-card);

    border: 2px solid grey;
    box-shadow: 5px 5px 5px grey;
  }

  .project-info {
    align-self: flex-start;
  }

  .project-heading {
    margin: 0 0 0.5em 0;
    text-align: center;
  }

  .project-info {
    margin: 0 1em;
  }

  @media screen and (max-width: 600px) {
    .project-card {
      padding: 0.5em;
      align-items: center;
    }

    .project-info {
      margin: 0;
    }

    .project-content {
      flex-direction: column;
    }
  }
</style>
