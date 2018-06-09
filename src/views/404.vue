<template>
    <div id="notFound">
        <h1>An error occurred.</h1>
        <p>Sorry, the page you are looking for is currently unavailable.
            <br/> Please try again later.</p>
        <p>If you are the system administrator of this resource then you should check the
            <a href="http://nginx.org/r/error_log">error log</a> for details.</p>
        <p>
            <em>Faithfully yours, nginx.</em>
        </p>
        <p style="color: blue"><router-link to="/">点击回到首页</router-link></p>
    </div>
</template>

<script>
    export default {

    }
</script>

<style scoped>
    #notFound {
        width: 35em;
        margin: 0 auto;
        font-family: Tahoma, Verdana, Arial, sans-serif;
    }
</style>