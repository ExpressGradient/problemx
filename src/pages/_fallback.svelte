<script>
  import { goto } from "@sveltech/routify";
</script>

<div class="fallback-div">
  <h1 on:click={() => $goto("/")}>ProblemX</h1>
  <h2>Woah, looks like you've lost path mate</h2>
  <p>Try finding/creating some problems</p>
</div>

<style>
  .fallback-div {
    text-align: center;
    font-size: 25px;
    color: #fff;
  }

  h1 {
    cursor: pointer;
    transition: ease-in 300ms;
  }

  h1:hover {
    font-size: 55px;
  }

  h1:active {
    font-size: 52px;
  }
</style>