<script>
    import { firebaseAuth } from "../_firebase_utils";
    import { goto } from "@sveltech/routify";

    let currentUser = null;
    firebaseAuth.onAuthStateChanged((firebaseUser) => {
        if(firebaseUser !== null) {
            currentUser = firebaseUser;
        } else {
            currentUser = null;
        }
    })
</script>

{#if currentUser}
    <h1>{firebaseAuth.currentUser.displayName}</h1>
{:else}
    <div class="user-not-found">
        <h1 on:click={() => $goto("/")} class="title">ProblemX</h1>
        <h2>UserNotFoundError</h2>
        <p>Sign In to see your profile</p>
    </div>
{/if}

<style>
    h1 {
        text-align: center;
        color: #fff;
    }

    div {
        text-align: center;
        color: #fff;
        font-size: 25px;
    }

    .title {
        transition: ease-in 300ms;
        cursor: pointer;
    }

    .title:hover {
        font-size: 55px;
    }

    .title:active {
        font-size: 52px;
    }
</style>