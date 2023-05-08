<script>
  export let amountPlayers
  export let showPlayers
</script>

{#if amountPlayers > 0 && amountPlayers < 3}
  <div class="hint">
    {#if amountPlayers === 1}
      ⚠️ Mindestens zwei weitere Personen brauchst du noch, dann kann es loslegen!
    {/if}

    {#if amountPlayers === 2}
      ⚠️ Mindestens eine weitere Person braucht ihr noch, dann könnt ihr loslegen!
    {/if}
  </div>
{/if}

{#if amountPlayers > 2}
  <button type="button" on:click={() => showPlayers = false}>
    <span class="rocket"> 🚀</span>
    Let's a go!
    <span class="rocket"> 🚀</span>
  </button>
{/if}

<style>
  .hint {
    background: #FFc;
    border: 1px dashed black;
    color: black;
    font-size: 1.5rem;
    border-radius: 0.5em;
    padding: 1em;
  }

  button {
    box-shadow: 1px 1px 0.2em rgba(0, 0, 0, 0.5);
  }

  @keyframes schaukel {
    0% {
      transform: rotate(1deg) scale(100%)
    }
    50% {
      transform: rotate(-1deg) scale(102%)
    }
    100% {
      transform: rotate(1deg) scale(100%)
    }
  }

  .rocket {
    display: inline-block;
    animation-name: schaukel;
    animation-duration: .2s;
    transform: rotate(-1deg) scale(100%);
    animation-iteration-count: infinite;
    animation-timing-function: cubic-bezier(0.5, -0.68, 0.41, 1.55);
  }

  button {
    animation-name: schaukel;
    animation-duration: 2s;
    transform: rotate(-1deg) scale(100%);
    animation-iteration-count: infinite;
    animation-timing-function: cubic-bezier(0.5, -0.68, 0.41, 1.55);
  }
</style>
