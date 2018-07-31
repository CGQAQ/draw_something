<template>
    <div>
        <div id="root">
            <div class="field is-horizontal">
                 <label
                    for="account"
                    class="field-label is-normal has-text-primary">
                    Account:
                </label>
                 <input
                    class="input field-body is-primary"
                    type="text" id="account"
                    v-model="account" />
                 <span
                    class="has-text-danger warn"
                    v-show="accountWarn">
                    <span class="icon has-text-info">
                        <i class="fa fa-ban has-text-danger"></i>
                    </span>
                    Please fill account(1-20, no digits lead, none capitals)
                </span>
            </div>
            <div class="field is-horizontal">
                 <label
                    for="nickname"
                    class="field-label is-normal has-text-primary">
                    Nickname:
                </label>
                 <input
                    class="input field-body is-primary"
                    type="text" id="nickname"
                    v-model="nickname" />
                <span
                    class="has-text-danger warn"
                    v-show="nicknameWarn">
                    <span class="icon has-text-info">
                        <i class="fa fa-ban has-text-danger"></i>
                    </span>
                    Please fill nickname(1-15 any charactors)
                </span>
            </div>
            <div class="field is-horizontal">
                 <label
                    for="password"
                    class="field-label is-normal has-text-primary">
                    Password:
                </label>
                 <input
                    class="input field-body is-primary"
                    type="password" id="password"
                    v-model="password" />
                <span
                    class="has-text-danger warn"
                    v-show="passwordWarn">
                    <span class="icon has-text-info">
                        <i class="fa fa-ban has-text-danger"></i>
                    </span>
                    Please fill password(6-24 a-z A-Z 0-9 - _ $ *)
                </span>
            </div>
            <div class="field is-horizontal">
                 <label
                    for="repassword"
                    class="field-label is-normal has-text-primary">
                    RePassword:
                </label>
                 <input
                    class="input field-body is-primary"
                    type="password" id="repassword"
                    v-model="repassword" />
                <span
                    class="has-text-danger warn"
                    v-show="repasswordWarn">
                    <span
                        class="icon has-text-info"
                        v-show="repasswordWarn">
                        <i class="fa fa-ban has-text-danger"></i>
                    </span>
                    Two passwords are different.
                </span>
            </div>
            <div class="field is-horizontal">
                <label
                    for="question"
                    class="field-label is-normal has-text-primary">
                    Question:
                </label>
                <input
                    class="input field-body is-primary"
                    type="text" id="question"
                    v-model="question" />
                <span
                    class="has-text-danger warn"
                    v-show="questionWarn">
                    <span class="icon has-text-info">
                        <i class="fa fa-ban has-text-danger"></i>
                    </span>
                    Please fill safe question(1-50 any words)
                </span>
            </div>
            <div class="field is-horizontal">
                 <label
                    for="answer"
                    class="field-label is-normal has-text-primary">
                    Answer:
                </label>
                 <input class="input field-body is-primary"
                    type="text"
                    id="answer"
                    v-model="answer" >
                <span
                    class="has-text-danger warn"
                    v-show="answerWarn">
                    <span class="icon has-text-info">
                        <i class="fa fa-ban has-text-danger"></i>
                    </span>
                    Please fill safe answer(1-50 any words)
                </span>
            </div>

            <div id="controls" class="is-horizontal">
                <button
                    class="button is-danger"
                    @click="reset">
                    Reset all
                </button>
                <button
                    class="button is-primary"
                    @click="signup">
                    Signup
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import Account from '@/controllers/Account';

export default {
    name: 'Signup',
    data() {
        return {
            account: '',
            accountWarn: false,
            nickname: '',
            nicknameWarn: false,
            password: '',
            passwordWarn: false,
            repassword: '',
            repasswordWarn: false,
            question: '',
            questionWarn: false,
            answer: '',
            answerWarn: false,
        };
    },
    watch: {
        account(value) {
            this.accountWarn = value.match(/^(?![0-9])[a-z0-9]{1,20}$/) === null;
        },
        nickname(value) {
            this.nicknameWarn = value.match(/^.{1,15}$/) === null;
        },
        password(value) {
            this.passwordWarn = value.match(/^[a-zA-Z0-9-_\$\*\.]{6,24}$/) === null;
        },
        repassword(value) {
            this.repasswordWarn = this.password !== value;
        },
        question(value) {
            this.questionWarn = value.match(/^.{1,50}$/) === null;
        },
        answer(value) {
            this.answerWarn = value.match(/^.{1,50}$/) === null;
        },
    },
    mounted(){
        document.querySelectorAll('.warn').forEach(element => {
            element.addEventListener('animationend', function(){
                this.classList.remove('shakeit');
            });
        });
    },
    methods: {
        reset() {
            this.account = '';
            this.nickname = '';
            this.password = '';
            this.repassword = '';
            this.question = '';
            this.answer = '';
        },
        signup() {
            if (
                !(
                    this.accountWarn ||
                    this.nicknameWarn ||
                    this.passwordWarn ||
                    this.repasswordWarn ||
                    this.questionWarn ||
                    this.answerWarn
                )
            ) {
                Account.signup({
                    account: this.account,
                    nickname: this.nickname,
                    password: this.password,
                    question: this.question,
                    answer: this.answer,
                });
            }
            else {
                document.querySelectorAll('.warn').forEach(element => {
                    element.classList.add('shakeit');
                });
            }
        },
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

    @keyframes shake {
       0%{
            transform: none;
       }
       30%{
           transform: translate(10px, 0);
       }
       60%{
           transform: translate(-10px, 0);
       }
       100%{
           transform: none;
       }
    }

    .shakeit{
        animation-name: shake;
        animation-duration: 200ms;
    }
</style>
