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
};
