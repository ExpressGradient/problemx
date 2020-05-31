<script>
    import { goto } from "@sveltech/routify";
    import { firebaseAuth } from "./_firebase_utils";
    import { tweened } from "svelte/motion";
    import { cubicOut } from "svelte/easing";

    let currentUser = null;
    firebaseAuth.onAuthStateChanged((firebaseUser) => {
        if(firebaseUser !== null) {
            currentUser = firebaseUser;
        } else {
            currentUser = null;
        }
    });

    let title = "";
    let description = "";
    let categories = "";

    const severity = tweened(0, {
        duration: 400,
        easing: cubicOut
    });

    const createProblem = () => {} //TODO complete this createProblem() by adding firestore
</script>

<div>
    <h1 on:click={() => $goto("/")}>ProblemX</h1>
    {#if currentUser !== null}
        <form on:submit={createProblem}>
            <h2>Create a new problem</h2>
            <label>
                Title
                <input type="text" required bind:value={title}>
            </label>
            <label>
                Description
                <textarea required rows="5" bind:value={description}></textarea>
            </label>
            <label>
                Categories
                <input type="text" required placeholder="Enter comma separated values" bind:value={categories}>
            </label>
            <label>
                Severity
                <progress value={$severity}></progress>
                <button type="button" class="severe-button" on:click={() => severity.set(0.25)}>Fun</button>
                <button type="button" class="severe-button" on:click={() => severity.set(0.5)}>Okay</button>
                <button type="button" class="severe-button" on:click={() => severity.set(0.75)}>Severe</button>
                <button type="button" class="severe-button" on:click={() => severity.set(1)}>Damn</button>
            </label>
            <button type="submit" class="submit-button">Create a problem</button>
        </form>
    {:else}
        <h2>Auth Error</h2>
        <p>Create an account first</p>
    {/if}
</div>

<style>
    div {
        font-size: 20px;
        text-align: center;
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

    form {
        margin-top: 15%;
    }

    label {
        font-size: 20px;
        margin: 20px;
    }

    input, textarea, progress {
        display: block;
        width: 90%;
        margin: 10px auto;
        outline: none;
        background: lightgray;
    }

    progress {
        color: #7289DA;
    }

    progress::-moz-progress-bar {
        background: #7289DA;
    }

    progress::-webkit-progress-value {
        background: #7289DA;
    }

    button {
        transition: ease-in 300ms;
    }

    button:hover {
        font-size: 25px;
    }

    button:active {
        font-size: 22px;
    }

    .submit-button {
        background-color: #7289DA;
        color: #fff;
    }

    @media screen and (min-width: 760px) {
        form {
            margin-top: 20px
        }

        input, textarea, progress {
            width: 40%;
        }

        button {
            width: 19%;
            cursor: pointer;
        }

        .severe-button {
            width: 10%;
        }
    }
</style>