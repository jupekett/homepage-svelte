<script>
  import { fetchMdAndConvertToHtml } from "../lib/md-to-html";

  const projectsInCategories = [
    {
      id: "node",
      name: "Node.js",
      projects: [
        {
          id: "valheim",
          name: "Valheim server Discord bot",
          liveAddress: "",
          repository: "https://github.com/jupekett/valheim-server-discord-bot",
        },
      ],
    },
    // { id: "react", fullName: "React.js", projects: [] },
  ];
</script>

<div class="content--portfolio">
  <main>
    <h1>Projects</h1>
    <p>
      Some relevant programming projects from personal life and my studies at
      JYU. Language in study projects might be finnish.
    </p>
    <ul>
      {#each projectsInCategories as category}
        <li><a href="#{category.id}">{category.name}</a></li>
      {/each}
    </ul>

    {#each projectsInCategories as category}
      <section id={category.category}>
        <h2 class="centered-vertical margin-top">{category.name}</h2>

        {#each category.projects as project}
          <article class="project-card">
            <div class="project-content">
              <section class="project-info">
                <h3 class="project-heading">{project.name}</h3>

                {#await fetchMdAndConvertToHtml(`projects/${project.id}/description.md`) then description}
                  {@html description}
                {/await}

                <ul>
                  {#if project.liveAddress}
                    <li>
                      <a href={project.liveAddress}>Live application</a>
                    </li>
                  {/if}
                  <li>
                    <a href={project.repository}>Source code</a>
                  </li>
                </ul>
              </section>
              <a href="projects/{project.id}/original.png">
                <img
                  class="thumbnail"
                  src="projects/{project.id}/thumbnail.png"
                  alt={project.name}
                />
              </a>
            </div>
          </article>
        {/each}
      </section>
    {/each}
  </main>
</div>

<style>
  .content--portfolio {
    margin: 0 auto;
    max-width: 800px;
    background-color: white;
  }

  .project-card {
    margin: 1em 0;
    padding: 1em;
    border: 2px solid grey;
    box-shadow: 5px 5px 5px grey;
  }

  .project-heading {
    font-size: 1.5em;
    margin: 0 0 0.5em 0;
    text-align: center;
  }

  .project-content {
    display: flex;
    align-items: flex-start;
  }

  .project-info {
    margin: 0 1em;
  }

  .project-content .thumbnail {
    max-width: 20em;
  }

  @media screen and (max-width: 800px) {
    .content--portfolio {
      margin: 0 1em;
    }
  }

  @media screen and (max-width: 600px) {
    .content--portfolio {
      margin: 0 0.5em;
    }

    .project-card {
      padding: 0.5em;
    }

    .project-info {
      margin: 0;
    }

    .project-content {
      flex-direction: column;
    }
  }
</style>
