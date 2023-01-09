<script lang="ts">
  import { mdToHtml } from "../lib/helpers";

  // Project descriptions.
  // I want to write these in markdown and load dynamically,
  // but couldn't get dynamic imports working without using the public folder and fetch.
  import valheimDescription from "../assets/projects/valheim/description.md?raw";
  import othelloDescription from "../assets/projects/othello/description.md?raw";
  import vt6Description from "../assets/projects/vt6/description.md?raw";
  import arsDescription from "../assets/projects/ars/description.md?raw";
  import ipDescription from "../assets/projects/ip/description.md?raw";
  import multicastDescription from "../assets/projects/multicast/description.md?raw";
  import nuottiDescription from "../assets/projects/nuotti/description.md?raw";

  type Project = {
    id: string;
    name: string;
    description: string;
    liveAddress?: string;
    downtimeReason?: string;
    repository: string;
  };

  type ProjectCategory = {
    id: string;
    name: string;
    projects: Array<Project>;
  };

  // For each project, create a folder `src/assets/projects/{project id}` containing necessary files
  const projectsInCategories: Array<ProjectCategory> = [
    {
      id: "node",
      name: "Node.js",
      projects: [
        {
          id: "valheim",
          name: "Valheim server Discord bot",
          description: valheimDescription,
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
          description: othelloDescription,
          liveAddress: "http://users.jyu.fi/~jupekett/tiea2120/othello-react/",
          repository: "https://gitlab.jyu.fi/jupekett/othello-react",
        },
        {
          id: "vt6",
          name: "Rogaining data frontend",
          description: vt6Description,
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
          description: arsDescription,
          downtimeReason: "to save on cloud costs",
          repository: "https://github.com/jupekett/ties4560-task4",
        },
        {
          id: "ip",
          name: "IP-enthusiast",
          description: ipDescription,
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
          description: multicastDescription,
          repository: "https://gitlab.jyu.fi/jupekett/multicast3",
        },
        {
          id: "nuotti",
          name: "Nuottirekisteri",
          description: nuottiDescription,
          repository: "https://gitlab.jyu.fi/jupekett/nuottirekisteri",
        },
      ],
    },
  ];

  function getProjectFileUrl(path: string): string {
    return new URL(path, import.meta.url).href;
  }

  function getImageUrl(project: string): string {
    return getProjectFileUrl(`../assets/projects/${project}/original.png`);
  }

  function getThumbnailUrl(project:string): string {
    return getProjectFileUrl(`../assets/projects/${project}/thumbnail.png`);
  }
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
          {@const imageUrl = getImageUrl(project.id)}
          {@const thumbnailUrl = getThumbnailUrl(project.id)}

          <article class="project-card">
            <div class="project-content">
              <section class="project-info">
                <h3 class="project-heading">{project.name}</h3>

                {#await mdToHtml(project.description) then description}
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

              <a href={imageUrl}>
                <img class="thumbnail" src={thumbnailUrl} alt={project.name} />
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
