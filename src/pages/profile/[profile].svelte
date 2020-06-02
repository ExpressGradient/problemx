<script>
    import { firestore, firebaseAuth } from "../_firebase_utils";
    import { goto, params } from "@sveltech/routify";

    const usersRef = firestore.collection("users");
    let userData = null;
    const query = usersRef.where("email", "==", $params.profile.toString()).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => userData = doc.data());
    });

    const signOut = () => {
        firebaseAuth.signOut();
        $goto("/");
    }

    let currentUser = null;
    firebaseAuth.onAuthStateChanged((firebaseUser) => {
        if(firebaseUser != null) {
            currentUser = firebaseUser;
        } else {
            currentUser = null;
        }
    });

</script>

<div class="profile-card">
    <h1 on:click={() => $goto("/")}>ProblemX</h1>
    {#if currentUser !== null && userData !== null}
        {#if currentUser.email === userData.email}
            <button on:click={signOut}>Sign Out</button>
        {/if}
    {/if}
    {#if userData !== null}
        <h4>Username: {userData.displayName}</h4>
        <h4>Email: {userData.email}</h4>
        <div class="problems-card">
            <h2>Problems:</h2>
            {#each userData.problems as problem}
                <h3>{problem.title}</h3>
                <progress value={problem.severity}></progress>
            {/each}
        </div>
    {/if}
</div>

<style>
    div {
        text-align: center;
        color: #fff;
        font-size: 20px;
    }

    .problems-card {
        margin-top: 20px;
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

    button {
        transition: ease-in 300ms;
        cursor: pointer;
    }

    button:hover {
        font-size: 25px;
    }

    button:active {
        font-size: 22px;
    }
</style>