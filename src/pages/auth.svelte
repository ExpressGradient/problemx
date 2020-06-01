<script>
    import { goto } from "@sveltech/routify";
    import { fade } from "svelte/transition";
    import { firebaseAuth, provider, createUserRecord } from "./_firebase_utils";

    let signInClicked = false;

    let signUpUsername = "";
    let signUpEmail = "";
    let signUpPassword = "";
    let signUpConfirmPassword = "";

    let signInEmail = "";
    let signInPassword = "";

    const googleConnect = () => {
        firebaseAuth.signInWithPopup(provider).then((result) => {
            createUserRecord(result.user);
            $goto("/");
        }).catch(error => window.alert(error.message));
    }

    const signUp = () => {
        if(signUpPassword === signUpConfirmPassword) {
            firebaseAuth.createUserWithEmailAndPassword(signUpEmail, signUpPassword).then((result) => {
                createUserRecord(result.user, { displayName: signUpUsername });
                window.alert("ProblemX account created");
                $goto("/");
            }).catch((error) => console.log("Error in creating ProblemX account => ", error.message));
        } else {
            window.alert("Passwords do not match");
        }
    }

    const signIn = () => {
        firebaseAuth.signInWithEmailAndPassword(signInEmail, signInPassword).then((result) => {
            window.alert("ProblemX account signing in");
            $goto("/");
        }).catch(error => console.log(error.message));
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
        <form on:submit|preventDefault={signUp} transition:fade={{duration: 800}}>
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
        font-size: 25px;
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