<script lang="ts">
  import ProjectCategory from "../lib/ProjectCategory.svelte";
  import type { ProjectCategory as iProjectCategory } from "./Portfolio.types";

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
  import homepageDescription from "../assets/projects/homepage/description.md?raw";

  // For each project, create a folder `src/assets/projects/{project id}` containing necessary files
  const projectsInCategories: iProjectCategory[] = [
    {
      id: "svelte",
      name: "Svelte",
      projects: [
        {
          id: "homepage",
          name: "My homepage",
          description: homepageDescription,
          liveAddress: "https://jupekett.github.io/homepage-svelte/portfolio",
          repository: "https://github.com/jupekett/homepage-svelte",
        }
      ]
    },
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
      description:
        "These applications are written in Java and would be deployed to **AWS Elastic Beanstalk**.",
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
</script>

<main class="content--portfolio">
  <section class="introduction">
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
  </section>

  {#each projectsInCategories as category}
    <ProjectCategory {category} />
  {/each}
</main>

<style>
  .content--portfolio {
    background-color: white;
  }

  .introduction {
    max-width: var(--content-width);
    margin: 0 auto;
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
  }
</style>
