<script>
    let search = "";
    const searchProblem = () => {}
</script>

<form on:submit|preventDefault={searchProblem}>
    <label>
        Search Problems:
        <input type="text" bind:value={search}>
    </label>
    <button type="submit">Search</button>
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

    button {
        cursor: pointer;
        width: 30%;
        background-color: #7289DA;
        color: #fff;
        transition: ease-in 300ms;
    }

    button:hover {
        font-size: 25px;
    }

    button:active {
        font-size: 22px;
    }

    @media screen and (min-width: 760px) {
        input, button {
            width: 17%;
        }
    }
</style>