<script>
    import { goto, params } from "@sveltech/routify";
    import { firestore, firebaseAuth, solveProblem, solveUserProblem } from "../_firebase_utils";

    let title = decodeURIComponent($params.problem);
    const problemsRef = firestore.collection("problems").doc(title);
    const usersRef = firestore.collection("users");

    let solversData = [];
    let problemData = {};

    problemsRef.get().then((doc) => {
        if(doc.exists) {
            problemData = doc.data();
            problemData.solvers.forEach((solver) => {
               usersRef.doc(solver).get().then((doc) => {
                   solversData = [...solversData, {displayName: doc.data().displayName, email: doc.data().email}]
               });
            });
        }
    });

    const solveClick = () => {
        if(firebaseAuth.currentUser !== null) {
            solveProblem(firebaseAuth.currentUser.uid, title).then(() => solveUserProblem(firebaseAuth.currentUser.uid, title));
        } else {
            window.alert("Try Signing In..");
        }
    }
</script>

<div class="problem-card">
    <h1 on:click={() => $goto("/")}>ProblemX</h1>
    <h2>{title}</h2>
    <button on:click={solveClick}>Wanna Solve?</button>
    <p>Severity Level: {problemData.severity}</p>
    <h3>Categories: {problemData.categories}</h3>
    <p>Description: {problemData.description}</p>
    <p>Problem posted by {problemData.creator} at {problemData.createdAt}</p>
</div>

<div class="solvers">
    <h2>Who's solving this problem??</h2>
    {#each solversData as solver}
        <div class="solver">
            <p>{solver.displayName}</p>
            <p>{solver.email}</p>
        </div>
    {/each}
</div>

<style>
    .problem-card, .solvers {
        color: #fff;
        font-size: 20px;
        text-align: center;
    }

    .solver {
        margin: 10px;
    }

    button {
        cursor: pointer;
        transition: ease-in 300ms;
    }

    button:hover {
        font-size: 25px;
    }

    button:active {
        font-size: 22px;
    }

    h1 {
        transition: ease-in 300ms;
        cursor: pointer;
    }

    h1:hover {
        font-size: 55px;
    }

    h1:active {
        font-size: 52px;
    }
</style>