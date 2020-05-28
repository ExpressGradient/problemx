<script>
    let search = "";
    const searchProblem = () => {}
</script>

<form on:submit|preventDefault={searchProblem}>
    <label>
        Search Problems:
        <input type="text" bind:value={search}>
    </label>
</form>

<style>
    form {
        text-align: center;
        color: white;
        font-size: 20px;
    }

    input {
        margin-top: 15px;
        background-color: lightgray;
    }

    input:focus {
        outline: none;
    }
</style>