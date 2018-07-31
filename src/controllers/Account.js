import axios from 'axios';

export default {
    signup(account) {
        axios.post(
            'http://localhost:8000/api/signup',
            {
                account: account.account,
                nickname: account.nickname,
                password: account.password,
                question: account.question,
                answer: account.answer,
            },
        );
    },
    login(account, callback) {
        axios.post(
            'http://localhost:8000/api/login',
            {
                account: account.account,
                password: account.password,
            }
        ).then((value) => {
            callback(value.data)
        }).catch((err) => {
            throw err;
        })
    }
};
