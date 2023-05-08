<script>
  import {slide} from 'svelte/transition';

  let mainTextWithNames = ''
  let additionalTextWithNames = ''

  export let secondCardVisible

  export let players = []
  export let mainText = ''
  export let additionalText = ''
  export let cardDone

  let replacingTexts

  function formatText(text = '', p1, p2, p3) {
    return text
    .replaceAll('{p1}', `<b class="playername">${p1}</b>`)
    .replaceAll('{p2}', `<b class="playername">${p2}</b>`)
    .replaceAll('{p3}', `<b class="playername">${p3}</b>`);
  }

  $: {
    secondCardVisible = false
    replacingTexts = true

    mainTextWithNames = ''
    additionalTextWithNames = ''

    const randomP1 = players[Math.floor(Math.random() * players.length)];
    let remainingPlayers = players.filter(p => p !== randomP1)

    const randomP2 = remainingPlayers[Math.floor(Math.random() * remainingPlayers.length)];
    remainingPlayers = remainingPlayers.filter(p => p !== randomP2)

    const randomP3 = remainingPlayers[Math.floor(Math.random() * remainingPlayers.length)];

    window.setTimeout(() => {
      mainTextWithNames = formatText(mainText, randomP1, randomP2, randomP3)
      additionalTextWithNames = formatText(additionalText, randomP1, randomP2, randomP3)
      replacingTexts = false
    }, 800)
  }

  $: {
    cardDone = !replacingTexts && (!additionalTextWithNames || secondCardVisible)
    if (secondCardVisible) {
      window.setTimeout(
          () => document.querySelector('.additional-text').scrollIntoView({behavior: 'smooth'}),
          200)
    }
  }
</script>


{#if mainTextWithNames}
  <div class="card main-text" transition:slide>
    <div>{@html mainTextWithNames}</div>
  </div>
{/if}

{#if !cardDone && !replacingTexts }
  <button type="button" on:click={() => secondCardVisible = true} transition:slide>...</button>
{/if}

{#if secondCardVisible}
  <div class="card additional-text" transition:slide>
    <div>{@html additionalTextWithNames}</div>
  </div>
{/if}

<style>
  .card :global(img) {
    box-shadow: 1px 1px 3px #000;
    max-width: 100%;
    max-height: 280px;
    margin: .5em 0;
    transform: rotate(-1deg);
  }

  /* .playername is created above int the formatText function */
  .card :global(.playername) {
    font-weight: bold;
    text-decoration: underline;
    color: #a00;
  }

  @keyframes schaukel {
    0% {transform: rotate(3deg) scale(100%)}
    50% {transform: rotate(-3deg) scale(110%)}
    100% {transform: rotate(3deg) scale(100%)}
  }

  button {
    animation-name: schaukel;
    animation-duration: 1.5s;
    transform: rotate(-3deg) scale(100%);
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
  }
</style>
