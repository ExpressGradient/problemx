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
</script>

<div class="profile-card">
    <h1 on:click={() => $goto("/")}>ProblemX</h1>
    {#if userData !== null}
        <h4>Username: {userData.displayName}</h4>
        <h4>Email: {userData.email}</h4>
    {/if}
</div>

<style>
    div {
        text-align: center;
        color: #fff;
        font-size: 25px;
    }

    h1 {
        text-align: center;
        color: #fff;
        cursor: pointer;
    }

    h1:hover {
        font-size: 55px;
        transition: ease-in 300ms;
    }

    h1:active {
        font-size: 52px;
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