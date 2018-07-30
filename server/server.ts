import Db from  './db';
import { AccountManager, Account } from './AccountManager'

import { Response } from 'express';
import * as Express from 'express';
import {check, oneOf, validationResult} from 'express-validator/check';
import { genSaltSync, compareSync, hashSync} from 'bcryptjs';

const app  = Express()
const port = 8000;
const server = app.listen(port);
const am = new AccountManager();

app.use(Express.urlencoded());
app.use(Express.json());

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
            .matches(/^.{6,24}$/).withMessage('password format invalid')
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
    res.header('Access-Control-Allow-Origin', '1')
    if(result.isEmpty()){
        am.signup(<Account>{
            account: req.body.account,
            nickname: req.body.nickname,
            password: hashSync(req.body.password),
            question: req.body.question,
            answer: hashSync(req.body.answer),
        }, res);
    }
    else{
        res.json(result.mapped());
    }
});
