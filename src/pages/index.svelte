<script>
    import Appbar from "./_components/Appbar.svelte";
    import { firestore } from "./_firebase_utils";
    import { goto } from "@sveltech/routify";

    let problems = [];
    $: problems.sort((a, b) => (b.severity - a.severity));
    firestore.collection("problems").get().then((docs) => docs.forEach((doc) => {
        problems = [...problems, doc.data()];
    }));

    let searchInput = "";
    const submitSearch = () => {
        problems = problems.filter((problem) => (searchInput === problem.title));
    }
</script>

<svelte:head>
    <title>ProblemX</title>
</svelte:head>

<Appbar />

<div class="search-form">
    <form on:submit|preventDefault={submitSearch}>
        <label>
            Search Problem:
            <input type="text" required bind:value={searchInput}>
        </label>
        <button type="submit">Search</button>
    </form>
</div>

<div class="info">
    <p>You an org? Mail us!!!</p>
    <p>express.gradient@gmail.com</p>
</div>

<div class="problems-list">
    <h2>Top Problems</h2>
    {#each problems as problem}
        <div class="problem-card" on:click={() => $goto("/problem/:problem", {problem: problem.title})}>
            <h2>{problem.title}</h2>
            <progress value={problem.severity}></progress>
            <p>{problem.description}</p>
            <p>{problem.categories}</p>
            <p>Posted by {problem.creator} at {problem.createdAt.toString()}</p>
        </div>
    {/each}
</div>

<style>
    .problems-list, .info, .search-form {
        font-size: 20px;
        text-align: center;
        color: #fff;
        margin-top: 10px;
        margin-bottom: 10px;
    }

    .problem-card {
        width: 90%;
        margin: 10px auto;
        border: 2px solid #fff;
        word-wrap: break-word;
        padding: 10px;
    }

    input {
        margin-top: 15px;
        background-color: lightgray;
    }

    input:focus {
        outline: none;
    }

    button {
        cursor: pointer;
        width: 30%;
        background-color: #7289DA;
        color: #fff;
        transition: ease-in 300ms;
    }

    button:hover {
        font-size: 25px;
    }

    button:active {
        font-size: 22px;
    }

    @media screen and (min-width: 760px) {
        .problem-card {
            width: 50%;
            cursor: pointer;
            transition: ease-in 300ms
        }

        .problem-card:hover {
            width: 55%;
        }

        .problem-card:active {
            width: 52%;
        }

        input, button {
            width: 17%;
        }
    }
</style>