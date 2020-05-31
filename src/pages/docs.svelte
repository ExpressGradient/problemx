<script>
    import { goto } from "@sveltech/routify";
</script>

<div class="docs">
    <h1 on:click={() => $goto("/")}>ProblemX</h1>
    <h2>Docs</h2>

    <h3>$: What is this site?</h3>
    <p class="content">
        This site is a platform for posting and looking up current problems that exist in the world.
    </p>

    <h3>$: How to work around in this site?</h3>
    <p class="content">
        Just search for problems of your liked category and start solving them if you want.
        Other than that, you can also create a new problem which you want others to solve.
        Be it a real serious issue, or a fun problem.
    </p>

    <h3>$: Why did we build this site?</h3>
    <p class="content">
        This site is a solution to our college hackathon => HackNU2.0
    </p>

    <h3>$: How did we build this site?</h3>
    <p class="content">
        We've used: <a href="https://svelte.dev" target="_blank">SvelteJS</a> for building frontend,
        <a href="https://routify.dev" target="_blank">Routify</a> for routing svelte pages,
        <a href="https://discord.com/branding" target="_blank">Discord Branding</a> for colors and
        <a href="https://firebase.google.com" target="_blank">Firebase</a> for backend services like authentication and database.
    </p>

    <h3>$: Team</h3>
    <p class="content">
        <a href="https://github.com/ExpressGradient" target="_blank">ExpressGradient</a>,
        <a href="https://github.com/macklark" target="_blank">macklark</a>,
        <a href="https://github.com/rohithrede" target="_blank">rohithrede</a>,
        <a href="https://github.com/mushu0808" target="_blank">mushu0808</a> and
        <a href="https://github.com/kiddiesscript" target="_blank">kiddiesscript</a>
    </p>

    <h3>$: Github Repository</h3>
    <p class="content"><a href="https://github.com/ExpressGradient/problemx" target="_blank">ProblemX Repo</a></p>
</div>

<style>
    .docs {
        font-size: 25px;
        text-align: center;
        color: #fff;
        margin: 15px;
    }

    .content {
        text-align: left;
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

    h3 {
        margin-top: 50px;
    }

    a {
        color: #7289DA;
        text-decoration: none;
        transition: ease-in 300ms;
    }

    a:hover {
        background-color: #fff;
        padding: 10px;
    }

    a:active {
        font-size: 20px;
    }

    @media screen and (min-width: 760px) {
        .docs {
            width: 60%;
            margin: 20px auto;
        }
    }
</style>