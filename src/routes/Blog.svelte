<script lang="ts">
  import { mdToHtml as markdownToHtml } from "../lib/helpers";
  import type { Post } from "./Blog.types";

  async function importPosts(): Promise<Post[]> {
    const postsGlob = import.meta.glob("../assets/posts/*.md", { as: "raw" });
    const postPaths = Object.keys(postsGlob);
    const postPathsNewestFirst = postPaths.sort((a, b) => b.localeCompare(a));

    const posts: Post[] = [];

    for (const path of postPathsNewestFirst) {
      const post = await getPostObject(postsGlob, path);
      posts.push(post);
    }
    return posts;
  }

  async function getPostObject(
    postsGlob: Object,
    postPath: string
  ): Promise<Post> {
    const markdown = await postsGlob[postPath]();
    const html = markdownToHtml(markdown);

    return {
      dateTime: getPostDateTime(postPath),
      html,
    };
  }

  function getPostDateTime(postPath: string) {
    const dateOptions: Intl.DateTimeFormatOptions = {
      weekday: "long",
      day: "numeric",
      month: "numeric",
      year: "numeric",
    };
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "numeric",
      timeZoneName: "shortOffset",
    };

    const postedTime = postPath.match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/)[0];
    const date = new Date(postedTime);
    const dateString = date.toLocaleDateString("en-GB", dateOptions);
    const timeString = date.toLocaleTimeString("en-GB", timeOptions);

    return `${dateString} at ${timeString}`;
  }
</script>

  <main class="content--blog">
    <h1>Some thoughts</h1>
    {#await importPosts() then posts}
      {#if posts.length < 1}
        <p>Couldn't load posts. Bummer!</p>
      {/if}
      {#each posts as post}
        <article>
          <section class="blog-post">
            <p>
              <span class="blog-timestamp">{post.dateTime}</span>
            </p>
            {@html post.html}
          </section>
        </article>
      {/each}
    {/await}
  </main>

<style>
  h1 {
    text-align: center;
  }
  .content--blog {
    margin: 0 auto;
    max-width: 600px;
    background-color: white;
  }

  .blog-post {
    margin: 1em 0;
    padding: 1em;
    width: 100%;

    border: 2px solid grey;
    background-color: var(--background-color-card);

    box-shadow: 5px 5px 5px grey;
  }
  .blog-post :global(h1) {
    font-size: 2.2em;
    /* color: hsl(100 50% 10%); */
    /* color: hsl(20 80% 50% / 0.7); */
  }

  .blog-post :global(h2) {
    font-size: 1.8em;
    /* color: hsl(20 80% 50% / 0.9); */
  }

  .blog-post :global(h3) {
    /* font-size: 1.2em; */
  }

  .blog-timestamp {
    font-size: 1.3em;
    font-weight: bold;
    font-family: monospace;
    color: grey;
  }

  @media screen and (max-width: 600px) {
    .content--blog {
      margin: 0 0.5em;
    }
  }
</style>
