<template>
    <div>
        <div id="logo-wrapper">
            <img id="logo" src="../assets/logo.svg" alt="logo">
        </div>
        <div id="nav-item-wrapper" >
            <router-link to="/" class="button is-primary is-outlined is-large">HOME</router-link>
            <router-link to="/about" class="button is-primary is-outlined is-large">
                ABOUT
            </router-link>
        </div>
       <div id="form-item-wrapper" >
           <router-link to="/login" class="button is-outlined is-primary">Login</router-link>
           <router-link to="/signup" class="button is-outlined is-danger">Signup</router-link>
       </div>
    </div>
</template>

<script>
export default{
    name: 'NavBar',
};
</script>

<style lang="scss">
    @import "../global";
    @import "~bulma";

    #logo-wrapper{
        display: inline-block;
        margin-right: auto;


        #logo{
            height: calc(5rem - 2px);
            margin-left: 2em;
            border: 1px solid $main-color;
            box-sizing: border-box;
            transition: border-radius ease-out 200ms;
            &:hover {
                cursor: pointer;
                border-radius: 20%;
            }
        }
        &:hover {
            &::after{
                content: 'Draw something';
                position: absolute;
                top: 4em;
                color: $main-color;
                border: $main-color 1px solid;
                margin-left: .4em;
            }
        }
    }

    #nav-item-wrapper{
        height: 80%;
        margin-right: 2em;
        display: flex;
        align-items: center;
        border-right: 2px solid $main-color;
        padding-right: 3em;

        .button:first-child{
            margin-right: 1em;
        }
    }

    #form-item-wrapper{
        // nav items

        .button:last-child{
            margin-right: 2em;
            margin-left: 1em;
        }
    }

</style>
