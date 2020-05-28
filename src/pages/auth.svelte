<script>
    import { goto } from "@sveltech/routify";
    import { fade } from "svelte/transition";
    import { firebaseAuth, provider } from "./_firebase_utils";

    let signInClicked = false;

    let signUpUsername = "";
    let signUpEmail = "";
    let signUpPassword = "";
    let signUpConfirmPassword = "";

    let signInEmail = "";
    let signInPassword = "";

    const googleConnect = () => {
        firebaseAuth.signInWithPopup(provider);
    }

    const signUp = () => {
        if(signUpPassword === signUpConfirmPassword) {
            firebaseAuth.createUserWithEmailAndPassword(signUpEmail, signUpPassword);
        } else {
            window.alert("Passwords do not match");
        }
    }

    const signIn = () => {
        firebaseAuth.signInWithEmailAndPassword(signInEmail, signInPassword);
    }
</script>


<div>
    <h1 on:click={() => $goto("/")}>ProblemX</h1>
    <h2>Authentication</h2>
    <button type="button" class:active={!signInClicked} on:click={() => signInClicked = false}>Sign Up</button>
    <button type="button" class:active={signInClicked} on:click={() => signInClicked = true}>Sign In</button>
    {#if signInClicked}
        <form transition:fade={{duration: 800}} on:submit|preventDefault={signIn}>
            <h2>Sign In</h2>
            <label>
                Email
                <input type="text" required bind:value={signInEmail}>
            </label>
            <label>
                Password
                <input type="password" required bind:value={signInPassword}>
            </label>
            <button type="submit" class="auth-button">Sign In</button>
            <button type="button" on:click={googleConnect}>Connect With Google</button>
        </form>
    {:else}
        <form on:submit={signUp} transition:fade={{duration: 800}}>
            <h2>Sign Up</h2>
            <label>
                Username
                <input type="text" required bind:value={signUpUsername}>
            </label>
            <label>
                Email
                <input type="email" required bind:value={signUpEmail}>
            </label>
            <label>
                Password
                <input type="password" required bind:value={signUpPassword}>
            </label>
            <label>
                Confirm Password
                <input type="password" required bind:value={signUpConfirmPassword}>
            </label>
            <button type="submit" class="auth-button">Sign Up</button>
            <button type="button" on:click={googleConnect}>Connect With Google</button>
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