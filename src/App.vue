<template>
  <div id="app">
      <NavBar id="nav-wrapper"></NavBar>
      <router-view id="content"/>
  </div>
</template>

<script>
import NavBar from './components/Navbar.vue';

export default {
    components: {
        NavBar,
    },
};
</script>

<style lang="scss" scoped="false">
    @import "global";

    @font-face {
        @import url('https://fonts.googleapis.com/css?family=Lora');
    }
    body {
        margin: 0;
        padding: 0;
    }
    #app {
        font-family: Lora;
        display: grid;
        grid-template: "head head" 5em
                       "nav  nav" calc(100vh - 5em);
    }

    #nav-wrapper{
        grid-column: 1/-1;
        box-shadow: 0 10px 20px -3px #acacac;
        z-index: 2;
        border-top: 3px solid $main-color;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    #content {
        grid-column: 1/-1;
    }

</style>
