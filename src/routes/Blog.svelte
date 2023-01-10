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

<div class="content--blog">
  <main>
    {#await importPosts() then posts}
      {#if posts.length < 1}
        <h1>No posts to show</h1>
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
</div>

<style>
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
    box-shadow: 5px 5px 5px grey;
  }

  .blog-post a {
    font-weight: normal;
  }

  .blog-timestamp {
    font-size: 1em;
    font-weight: bold;
    color: grey;
  }

  @media screen and (max-width: 600px) {
    .content--blog {
      margin: 0 0.5em;
    }
  }
</style>
