<script lang="ts">
  import { mdToHtml } from "./helpers";
  import Thumbnail from "./Thumbnail.svelte";
  import type { Project } from "../routes/Portfolio.types";

  export let project: Project;

  const description = mdToHtml(project.description);
</script>

<article class="card">
  <h3 class="project-heading">{project.name}</h3>
  <section class="project-contents">
    <article class="project-description">
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
    </article>

    <article class="project-image">
      <Thumbnail {project} />
    </article>
  </section>
</article>

<style>
  .project-contents {
    display: flex;
    align-items: center;
  }

  .project-description {
    align-self: flex-start;
  }

  .project-heading {
    margin: 0 0 0.5em 0;
    text-align: center;
  }

  .project-description {
    margin: 0 1em;
    flex: 1 1 100%;
  }

  .project-image {
    flex: 1 1 100%;
  }

  @media screen and (max-width: 600px) {
    .project-contents {
      margin: 0;
    }

    .project-contents {
      flex-direction: column;
    }
  }
</style>
