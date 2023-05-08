<script>
  import HintIfInsuffisientPlayers from "./HintIfInsuffisientPlayers.svelte";
  import {slide} from 'svelte/transition';
  import {onMount} from 'svelte';

  export let players
  export let showPlayers

  let newName = ''
  let newNameNormalised = ''

  $: newNameNormalised = newName.trim().toUpperCase();

  const addPlayer = (e) => {
    e.preventDefault();

    if (players.includes(newNameNormalised)) {
      alert(`${newNameNormalised} hast Du schon eingetragen!`)
      return;
    }
    players = [...players, newNameNormalised]
    newName = ''
    document.getElementById('enterPlayerName').focus()
  }

  const removePlayer = player => players = players.filter(p => p !== player)

  onMount(() => {
    document.getElementById('enterPlayerName').focus()
  })

</script>

<div class="card" transition:slide>
  <h2>Moin, ihr 8-Armigen! <br> Bereit zum Orgeln?</h2>
  <div class="wer-ist-am-start">Wer ist am Start?</div>
  <div class="players">
    {#each players as player}
      <div class="player">{player}
        <button type="button" class="del" on:click={() => removePlayer(player)}>❌</button>
      </div>
    {/each}
  </div>

  <form on:submit={addPlayer} autocomplete="off">
    <input id="enterPlayerName" bind:value={newName} type="text" placeholder="neuer Spieler" autocomplete="off"/>
    <button type="submit" class="add" disabled={newNameNormalised.trim().length === 0}>
      <span class="{newNameNormalised.trim().length === 0 ? '' : 'active'}">
        +
      </span>
    </button>
  </form>

  <div class="hint">
    <HintIfInsuffisientPlayers bind:showPlayers={showPlayers} amountPlayers={players.length}/>
  </div>

</div>

<style>
  @keyframes schaukel {
    0% {
      transform: rotate(1deg) scale(100%)
    }
    50% {
      transform: rotate(-1deg) scale(130%)
    }
    100% {
      transform: rotate(1deg) scale(100%)
    }
  }

  .active {
    display: inline-block;
    animation-name: schaukel;
    animation-duration: .5s;
    transform: rotate(-1deg) scale(100%);
    animation-iteration-count: infinite;
    animation-timing-function: cubic-bezier(0.5, -0.68, 0.41, 1.55);
  }


  h2 {
    font-size: 2.2rem;
    transform: skew(-2deg) rotate(-2deg);
  }

  .wer-ist-am-start {
    margin: 1em 0 0;
    color: black;
  }

  .players {
    width: 14em;
    display: flex;
    color: #000;
    font-size: 1.3rem;
    text-align: left;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;
    margin: 1em 0;
  }

  .player {
    display: flex;
    align-items: center;
    border: 1px dashed black;
    border-radius: 0.5em;
    height: 2em;
    margin: 0.5em;
    padding: 0 0 0 0.5em;
  }

  button {
    font-size: 1.2rem;
    line-height: 1.2rem;
    padding: 0.5rem;
    margin: 0.5rem 0;
  }

  .del {
    background: white;
    color: red;
    border-radius: 50%;
  }

  form {
    margin: 0 0 2rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 3rem;
  }

  input[type="text"] {
    font-size: 1rem;
    padding: 0 0 0 1em;
    border: 1px solid #811dc9;
    border-right: none;
    outline: 0;
    border-radius: 0.5em 0 0 0.5em;
    height: 46px;
    width: 14em;
  }

  .add {
    margin: 0;
    padding: 0 1rem;
    height: 48px;
    border-left: none;
    border-radius: 0 0.5em 0.5em 0;
  }

  .hint {
    width: 18rem;
  }
</style>
