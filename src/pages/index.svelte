<script>
    import Appbar from "./_components/Appbar.svelte";
    import CustomSearchForm from "./_components/CustomSearchForm.svelte";
    import { firestore } from "./_firebase_utils";

    let problems = [];
    $: problems.sort((a, b) => (b.severity - a.severity));
    firestore.collection("problems").get().then((docs) => docs.forEach((doc) => {
        problems = [...problems, doc.data()];
    }));
</script>

<svelte:head>
    <title>ProblemX</title>
</svelte:head>

<Appbar />
<CustomSearchForm />
<div>
    <p>You an org? Mail us!!!</p>
    <p>express.gradient@gmail.com</p>
</div>

<div class="problems-list">
    <h2>Top Problems</h2>
    {#each problems as problem}
        <div class="problem-card">
            <h2>{problem.title}</h2>
            <progress value={problem.severity}></progress>
            <p>{problem.description}</p>
            <p>{problem.categories}</p>
            <p>Posted by {problem.creator} at {problem.createdAt.toString()}</p>
        </div>
    {/each}
</div>

<style>
    .problems-list {
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
    }
</style>