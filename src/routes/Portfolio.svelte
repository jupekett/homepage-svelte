<script lang="ts">
  import { fetchMdAndConvertToHtml } from "../lib/md-to-html";

  type Project = {
    id: string;
    name: string;
    liveAddress?: string;
    downtimeReason?: string;
    repository: string;
  };

  type ProjectCategory = {
    id: string;
    name: string;
    projects: Array<Project>;
  };

  const projectsDirectory = "projects";

  // For each project, create a folder in `public/projects/` named with project id containing necessary files
  const projectsInCategories: Array<ProjectCategory> = [
    {
      id: "node",
      name: "Node.js",
      projects: [
        {
          id: "valheim",
          name: "Valheim server Discord bot",
          liveAddress: undefined,
          repository: "https://github.com/jupekett/valheim-server-discord-bot",
        },
      ],
    },
    {
      id: "react",
      name: "React.js",
      projects: [
        {
          id: "othello",
          name: "Othello",
          liveAddress: "http://users.jyu.fi/~jupekett/tiea2120/othello-react/",
          repository: "https://gitlab.jyu.fi/jupekett/othello-react",
        },
        {
          id: "vt6",
          name: "Rogaining data frontend",
          liveAddress: "http://users.jyu.fi/~jupekett/tiea2120/vt6/vt6.html",
          downtimeReason: "3rd party data unavailable",
          repository: "https://gitlab.jyu.fi/jupekett/vt6",
        },
      ],
    },
    {
      id: "java-aws",
      name: "Java on AWS",
      projects: [
        {
          id: "ars",
          name: "Accommodation Reservation System",
          downtimeReason: "to save on cloud costs",
          repository: "https://github.com/jupekett/ties4560-task4",
        },
        {
          id: "ip",
          name: "IP-enthusiast",
          downtimeReason: "to save on cloud costs",
          repository: "https://gitlab.jyu.fi/jupekett/ties4560-task1",
        },
      ],
    },
    {
      id: "java-desktop",
      name: "Java on desktop",
      projects: [
        {
          id: "multicast",
          name: "Multicast chat",
          repository: "https://gitlab.jyu.fi/jupekett/multicast3",
        },
        {
          id: "nuotti",
          name: "Nuottirekisteri",
          repository: "https://gitlab.jyu.fi/jupekett/nuottirekisteri",
        },
      ],
    },
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
      <section id={category.id}>
        <h2 class="centered-vertical margin-top">{category.name}</h2>

        {#each category.projects as project}
          <article class="project-card">
            <div class="project-content">
              <section class="project-info">
                <h3 class="project-heading">{project.name}</h3>

                {#await fetchMdAndConvertToHtml(`${projectsDirectory}/${project.id}/description.md`) then description}
                  {@html description}
                {/await}

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

              <a href="{projectsDirectory}/{project.id}/original.png">
                <img
                  class="thumbnail"
                  src="{projectsDirectory}/{project.id}/thumbnail.png"
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
