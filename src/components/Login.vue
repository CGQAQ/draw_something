<template>
    <div>
        <form @submit.prevent="submit">
            <input type="text" name="account" v-model="account">
            <input type="password" name="password" v-model="password">
            <input type="submit" value="login">
        </form>
    </div>
</template>

<script>
import am from '@/controllers/Account';
import { mapMutations } from 'vuex';

export default {
    name: 'Login',
    data() {
        return {
            account: '',
            password: '',
        };
    },
    methods: {
        ...mapMutations([
            'setAccount'
        ]),
        submit(){
            am.login({account: this.account, password: this.password}, (value) => {
                console.log(value)
                if(value && value.code === 0){
                    this.setAccount(value.data);
                }
            });
        }
    }
};
</script>

<style lang="scss">

</style>
