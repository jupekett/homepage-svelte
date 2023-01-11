<script lang="ts">
  const focusImage = (clickEvent: Event) => {
    clickEvent.preventDefault();
    const target = clickEvent.target as HTMLElement;
    const anchor = target.parentElement.closest("a");
    const imageSource = anchor.href;

    const dimLayer = dimTheBackground();
    showFocusedImage(imageSource, dimLayer);
  };

  function dimTheBackground(): HTMLElement {
    const dimLayer = document.createElement("div");
    dimLayer.className = "dim-layer";
    addFadeInOut(dimLayer);

    document.body.appendChild(dimLayer);
    return dimLayer;
  }

  function showFocusedImage(source: string, parent: HTMLElement): HTMLElement {
    const image = document.createElement("img");
    image.className = "img-focused";
    image.src = source;

    parent.appendChild(image);
    return image;
  }

  function addFadeInOut(element: HTMLElement) {
    const durationSeconds = 0.3;
    element.style.transition = `opacity ${durationSeconds}s`;

    fadeIn(element);
    addFadeOutListeners(element, durationSeconds);
  }

  function fadeIn(element: HTMLElement) {
    element.style.opacity = "0";
    setTimeout(() => {
      element.style.opacity = "1";
    }, 100); // need delay for element to render with 0 opacity first
  }

  function fadeOut(element: HTMLElement) {
    element.style.opacity = "0";
    element.style.pointerEvents = "none"; // only block first click
  }

  function addFadeOutListeners(element: HTMLElement, durationSeconds: number) {
    const removeElementAndKeyListener = (element: HTMLElement, durationSeconds: number) => {
      setTimeout(() => {
        removeSelf(element);
        // Keyup listener needs to be removed from document every time the image preview is dismissed.
        // Looks like Svelte doesn't need this?
        // document.removeEventListener("keyup", fadeOutListener);
      }, durationSeconds * 1000);
    };

    const fadeOutListener = () => {
      fadeOut(element);
      removeElementAndKeyListener(element, durationSeconds);
    };

    element.addEventListener("click", fadeOutListener);
    document.addEventListener("keyup", fadeOutListener);
  }

  function removeSelf(element: HTMLElement) {
    if (element.parentNode === null) {
      // Element is already removed, or is important such as document
      return;
    }
    element.parentNode.removeChild(element);
  }

  // // Idea for cleaner fadeout implementation. Doesn't work.
  // function closeFocusedImage(event: Event) {
  //   console.log('trying to close image')
  //   const image = event.target as HTMLElement:
  //   const dimLayer = image.parentNode as HTMLElement;
  //   fadeOut(dimLayer);
  // }

  export let imageUrl: string;
  export let thumbnailUrl: string;
  export let altText: string;
</script>

<a
  href={imageUrl}
  aria-label={`Larger image of ${altText}`}
  title={`Larger image of ${altText}`}
>
  <img
    src={thumbnailUrl}
    alt={altText}
    on:click={(event) => focusImage(event)}
  />
  <!-- I tried to add  on:keyup={event => closeFocusedImage(event)} or similar, but could not target the new centered img element -->
</a>

<style>
  img {
    max-width: 20em;
  }
</style>
