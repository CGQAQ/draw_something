import Db from  './db';
import { AccountManager, Account, ResponseFormat, ERROR_CODE } from './AccountManager'

import { Response } from 'express';
import * as Express from 'express';
import {check, oneOf, validationResult} from 'express-validator/check';
import * as express_session from 'express-session';

import { hashSync, compareSync } from 'bcryptjs';

import { serializeUser, deserializeUser, initialize, session } from 'passport';

import * as cors from 'cors';

import * as dotenv from 'dotenv';
import { userInfo } from 'os';

dotenv.config();

const app  = Express()
const port = 8000;
const server = app.listen(port);
const am = new AccountManager();

app.use(Express.urlencoded({extended: true}));
app.use(Express.json());
app.use(cors());
app.use(express_session({
    secret: process.env.SESSION_SECRET || 'asdDFuiawwe564--',
    resave: false,
    saveUninitialized: true
}))
app.use(initialize());
app.use(session());

serializeUser((user, done) => {
    done(null, user);
});
deserializeUser((user, done) => {
    done(null, user);
});


app.post('/api/signup',
    [
        check('account')
            .exists().withMessage('account does not exists!')
            .isString().withMessage('account does not a string')
            .isLowercase().withMessage('account does not a lowercase string')
            .matches(/^(?![0-9])[a-z0-9]{1,20}$/).withMessage('account format invalid')
            .not().isEmpty().withMessage('account is empty!'),
        check('nickname')
            .exists().withMessage('nickname does not exists!')
            .isString().withMessage('nickname does not a string')
            .matches(/^.{1,15}$/).withMessage('nickname format invalid')
            .not().isEmpty().withMessage('nickname is empty!'),
        check('password')
            .exists().withMessage('password does not exists!')
            .isString().withMessage('password does not a string')
            .matches(/^[a-zA-Z0-9-_\$\*\.]{6,24}$/).withMessage('password format invalid')
            .not().isEmpty().withMessage('password is empty!'),
        check('question')
            .exists().withMessage('question does not exists!')
            .isString().withMessage('question does not a string')
            .matches(/^.{1,50}$/).withMessage('question format invalid')
            .not().isEmpty().withMessage('question is empty!'),
        check('answer')
            .exists().withMessage('answer does not exists!')
            .isString().withMessage('answer does not a string')
            .matches(/^.{1,50}$/).withMessage('answer format invalid')
            .not().isEmpty().withMessage('answer is empty!'),
    ],
    function (req, res: Response) {
    const result = validationResult(req);
    if(result.isEmpty()){
        am.signup(<Account>{
            account: req.body.account,
            nickname: req.body.nickname,
            password: hashSync(req.body.password),
            question: req.body.question,
            answer: hashSync(req.body.answer),
        }, 
        (err, data)=>{
            if(err){
                console.warn('--- signup warning ---');
                console.warn(err.errno);
                console.warn(err.code);
                console.warn(err.sqlMessage);
                console.warn('--- end warning ---');
                res.json(<ResponseFormat>{
                    code: err.errno,
                    codeString: err.code,
                    codeDes: err.sqlMessage,
                });
            }
            else{
                res.json(<ResponseFormat>{
                    code: 0,
                    codeString: 'success',
                    codeDes: 'signup success' ,
                 });
            }
        }
    );
        res.redirect('/#/login');
    }
    else{
        res.json(result.mapped());
    }
});


app.post('/api/login',function(req, res, next){
    const account = req.body.account;
    const password = req.body.password;
    am.login(account, (err,data) =>{
        if(err){
            console.warn('--- login warning ---');
            console.warn(err.errno);
            console.warn(err.code);
            console.warn(err.sqlMessage);
            console.warn('--- end warning ---');
            res.json(<ResponseFormat>{
                code: err.errno,
                codeString: err.code,
                codeDes: err.sqlMessage,
            });
        }
        else{
            if(data.length === 0){
                res.json(<ResponseFormat>{
                    code: ERROR_CODE.ACCOUNT_WRONG_ACCOUNT,
                    codeString: 'ACCOUNT_WRONG_ACCOUNT',
                    codeDes: 'account not exist'
                });
            }
            else if(!compareSync(password, data[0].password)){
                res.json(<ResponseFormat>{
                    code: ERROR_CODE.ACCOUNT_WRONG_PASSWORD,
                    codeString: 'ACCOUNT_WRONG_PASSWORD',
                    codeDes: 'wrong password'
                })
            }
            else{
                res.json(<ResponseFormat>{
                    code: ERROR_CODE.ACCOUNT_SUCCESS,
                    codeString: 'success',
                    codeDes: 'login success' ,
                    data: {
                        account: data[0].account,
                        nickname: data[0].nickname,
                        signup: data[0].signup,
                    }
                });
            }
        }
    });
});