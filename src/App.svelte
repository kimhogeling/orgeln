<script>
  import Game from "./lib/Game.svelte";

  document.querySelector('.loading').style.display = 'none'
</script>

<main>
   <Game />
</main>

<style>
   main {
      font-size: 20px;
   }
</style>
