<script>
  import {blur, scale, slide} from 'svelte/transition';

  import {collection, getFirestore, onSnapshot, query} from "firebase/firestore"
  import Players from "./Players.svelte";
  import Card from "./Card.svelte";

  let players = []
  let showPlayers = false
  let initialDeck = []
  let gameDeck = []
  let loadingDeck = true

  const cardsRef = collection(getFirestore(), "cards")
  onSnapshot(
      query(cardsRef),
      querySnapshot => {
        gameDeck = querySnapshot.docs
        initialDeck = querySnapshot.docs
        currentCard = gameDeck[Math.floor(Math.random() * gameDeck.length)]
        window.setTimeout(() => {
          loadingDeck = false
          window.setTimeout(() => {
            showPlayers = true
          }, 1000)
        }, 2000)
        console.log(gameDeck.map(c => `${c.id}\t${c.data().text1 || ''}\t${c.data().text2 || ''}`).join('\n'))
      }
  );

  let cardDone = false
  let secondCardVisible = false
  let currentCard

  $: {
    currentCard = gameDeck[Math.floor(Math.random() * gameDeck.length)]
  }

  function nextCard() {
    gameDeck = gameDeck.filter(c => c.id !== currentCard.id);
  }

  function onKeyDown({key}) {
    if (!showPlayers && (key === 'Enter' || key === ' ')) {
      if (cardDone) {
        nextCard()
      } else {
        secondCardVisible = true
      }
    }
  }
</script>

<div class="main-container {loadingDeck ? 'loading-deck' : ''}">
  <div class="header">
    <div class="logo" transition:scale>
      <h1>Orgeln!</h1>
      <p class="purple">Wie ein 8-Armiger!</p>
    </div>
    {#if !loadingDeck && !showPlayers }
      <button type="button" class="edit-players" on:click={() => showPlayers = !showPlayers}
              title="Spieler" transition:blur={{ delay: 200}}>👨‍👩‍👧 Spieler
      </button>
    {/if}
  </div>

  {#if showPlayers }
    <Players bind:players={players} bind:showPlayers={showPlayers}/>
  {/if}

  {#if !showPlayers && currentCard && players.length > 2}
    <Card
        {players}
        mainText={currentCard.data().text1}
        additionalText={currentCard.data().text2}
        bind:cardDone
        bind:secondCardVisible
    />
  {/if}

  {#if gameDeck.length === 0 && players.length > 0}
    <div class="card" transition:slide>
      <p>Das wars! 🏁 Alle {initialDeck.length} Karten durch!</p><br>
      <p>Noch 'ne Runde?</p>
      <button type="button" class="replay" on:click={() => gameDeck = initialDeck}>🚀 Wir haben noch
        durst!
      </button>
    </div>
  {/if}

  {#if !showPlayers && cardDone && gameDeck.length > 0}
    <button type="button" class="next-card" on:click={nextCard} transition:slide>Nächste Karte ➡
    </button>
  {/if}
</div>

<svelte:window on:keydown={onKeyDown}/>

<style>
  .main-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    max-width: 40em;
  }

  .header {
    display: flex;
    position: relative;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  .logo {
    background: black;
    position: relative;
    width: 13.5rem;
    top: 1rem;
    left: 0.4rem;
    transition: all 1s cubic-bezier(0.5, -0.68, 0.41, 1.55);
  }

  .loading-deck .logo {
    left: 50%;
    transform: translate(-45%, 100%) scale(170%);
  }

  .logo h1 {
    transform: skew(-4deg) rotate(-4deg);
    font-size: 3.5rem;
  }

  .header .logo p {
    font-size: 1.8rem;
    transform: skew(-10deg) rotate(-10deg) translate(-0.4rem, -0.6rem);
  }

  .header button {
    margin: 10px 10px 0 0;
  }

  .logo::after {
    content: '🦑';
    display: inline-block;
    position: absolute;
    color: #811dc9;
    width: 1em;
    height: 1em;
    font-size: 1.8rem;
    top: 1.5rem;
    left: 0.2rem;
  }

  @keyframes schaukel {
    0% {transform: rotate(1deg) scale(100%)}
    50% {transform: rotate(-1deg) scale(105%)}
    100% {transform: rotate(1deg) scale(100%)}
  }

  .next-card {
    animation-name: schaukel;
    animation-duration: 1.5s;
    margin-bottom: 2em;
    transform: rotate(-1deg) scale(100%);
    animation-iteration-count: infinite;
    animation-timing-function: cubic-bezier(0.5, -0.68, 0.41, 1.55);
  }

  /* purple class is set in template (unsure, why a warning is here) */
  :global(.purple) {
    color: #811dc9;
  }

  /* card class is set in template (unsure, why a warning is here) */
  :global(.card) {
    font-size: 1.6em;
    text-align: center;
    margin: 1em;
    padding: 1em;
    border-radius: 0.5em;
    background: #fff;
    color: #811dc9;
  }

  :global(button) {
    font-family: "Roboto Condensed", sans-serif;
    border-radius: 0.5em;
    border: 0;
    outline: 0;
    background: #811dc9;
    color: #fff;
    margin: 0.5em;
    padding: 0.5em;
    font-weight: bold;
    font-size: 2em;
    cursor: pointer;
  }

  :global(button:hover) {
    background: #9400ff;
    outline: 2px solid yellow;
  }

  :global(button) {
    font-size: 1.7rem;
  }

  :global(button[disabled]) {
    background: #888;
    color: #eee;
  }
</style>
