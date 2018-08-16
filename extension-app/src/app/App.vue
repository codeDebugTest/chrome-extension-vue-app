<template>
    <div id="app">
        <img src="../assets/logo.png">
        <router-view/>
    </div>
</template>

<script>
import Model from './AppModel';

export default {
    name: 'App',
    props: {
        store: {
            type: Object,
            default() {
                return new Model();
            }
        }
    }
};
</script>

<style lang="less">
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
