<template>
    <div>
        <div id="root">
            <div class="field is-horizontal">
                 <label for="account" class="field-label is-normal has-text-primary">Account:</label>
                 <input class="input field-body is-primary" type="text" id="account" v-model="account">
                 <span class="has-text-danger ">
                    <span class="icon has-text-info">
                        <i class="fa fa-ban has-text-danger"></i>
                    </span>
                    Please fill account
                </span>
            </div>
            <div class="field is-horizontal">
                 <label for="nickname" class="field-label is-normal has-text-primary">Nickname:</label>
                 <input class="input field-body is-primary" type="text" id="nickname" v-model="nickname">
                <span class="has-text-danger ">
                    <span class="icon has-text-info">
                        <i class="fa fa-ban has-text-danger"></i>
                    </span>
                    Please fill account
                </span>
            </div>
            <div class="field is-horizontal">
                 <label for="password" class="field-label is-normal has-text-primary">Password:</label>
                 <input class="input field-body is-primary" type="password" id="password" v-model="password">
                <span class="has-text-danger ">
                    <span class="icon has-text-info">
                        <i class="fa fa-ban has-text-danger"></i>
                    </span>
                    Please fill account
                </span>
            </div>
            <div class="field is-horizontal">
                 <label for="repassword" class="field-label is-normal has-text-primary">RePassword:</label>
                 <input class="input field-body is-primary" type="password" id="repassword" v-model="repassword">
                <span class="has-text-danger ">
                    <span class="icon has-text-info">
                        <i class="fa fa-ban has-text-danger"></i>
                    </span>
                    Please fill account
                </span>
            </div>
            <div class="field is-horizontal">
                <label for="question" class="field-label is-normal has-text-primary">Question:</label>
                <input class="input field-body is-primary" type="text" id="question" v-model="question">
                <span class="has-text-danger ">
                    <span class="icon has-text-info">
                        <i class="fa fa-ban has-text-danger"></i>
                    </span>
                    Please fill account
                </span>
            </div>
            <div class="field is-horizontal">
                 <label for="answer" class="field-label is-normal has-text-primary">Answer:</label>
                 <input class="input field-body is-primary" type="text" id="answer" v-model="answer">
                <span class="has-text-danger ">
                    <span class="icon has-text-info">
                        <i class="fa fa-ban has-text-danger"></i>
                    </span>
                    Please fill account
                </span>
            </div>

            <div id="controls" class="is-horizontal">
                <button class="button is-danger" @click="reset">Reset all</button>
                <button class="button is-primary" @click="signup">Signup</button>
            </div>
        </div>  
    </div>
</template>

<script>

    import axios from "axios";

    export default {
        name: 'Signup',
        data: function(){
            return {
                account: '',
                nickname: '',
                password: '',
                repassword: '',
                question: '',
                answer: '',
            }
        },
        methods: {
            reset: function(){
                this.account = '';
                this.nickname = '';
                this.password = '';
                this.repassword = '';
                this.question = '';
                this.answer = '';
            },
            signup: function(){
                axios.post('http://localhost:8000/api/signup', 
                    {
                        account: this.account,
                        nickname: this.nickname,
                        password: this.password,
                        question: this.question,
                        answer: this.answer,
                    }
                )
            }
        },
    };
</script>

<style lang="scss" scoped>
    @import "~bulma";

    #root{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-top: 2rem;
    }

    #controls{
        display: flex;
        width: 50vw;
        justify-content: space-around;
    }
</style>
