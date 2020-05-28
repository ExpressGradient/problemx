<script>
    import { goto } from "@sveltech/routify";
    import { fade } from "svelte/transition";

    let signInClicked = false;
    const signUp = () => {}
</script>


<div>
    <h1 on:click={() => $goto("/")}>ProblemX</h1>
    <h2>Authentication</h2>
    <button type="button" class:active={!signInClicked} on:click={() => signInClicked = false}>Sign Up</button>
    <button type="button" class:active={signInClicked} on:click={() => signInClicked = true}>Sign In</button>
    {#if signInClicked}
        <form transition:fade={{duration: 800}}>
            <h2>Sign In</h2>
            <label>
                Email
                <input type="text">
            </label>
            <label>
                Password
                <input type="password">
            </label>
            <button type="submit" class="auth-button">Sign In</button>
            <button type="button">Connect With Google</button>
        </form>
    {:else}
        <form on:submit={signUp} transition:fade={{duration: 800}}>
            <h2>Sign Up</h2>
            <label>
                Username
                <input type="text" required>
            </label>
            <label>
                Email
                <input type="email" required>
            </label>
            <label>
                Password
                <input type="password" required>
            </label>
            <label>
                Confirm Password
                <input type="password" required>
            </label>
            <button type="submit" class="auth-button">Sign Up</button>
            <button type="button">Connect With Google</button>
        </form>
    {/if}
</div>

<style>
    div {
        text-align: center;
        color: #fff;
        font-size: 20px;
    }

    h1 {
        cursor: pointer;
        transition: ease-in 300ms;
    }

    h1:hover {
        font-size: 45px;
    }

    h1:active {
        font-size: 42px;
    }

    form {
        margin-top: 15%;
    }

    label {
        font-size: 20px;
        margin: 20px;
    }

    input {
        display: block;
        width: 90%;
        margin-top: 10px;
        margin-left: auto;
        margin-right: auto;
        outline: none;
        background: lightgray;
    }

    .auth-button {
        background-color: #7289DA;
        color: white;
    }

    .active {
        background-color: #7289DA;
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

    @media screen and (min-width: 760px) {
        form {
            margin-top: 20px
        }

        input {
            width: 40%;
        }

        button {
            width: 19%;
            cursor: pointer;
        }
    }
</style>