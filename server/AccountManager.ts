import Db from './db'
import { Response } from  'express'

export interface Account {
    id?: number;
    account: string;
    nickname: string;
    password: string;
    question: string;
    answer: string;
    signup?: string;
    lastseen?: string;
}

export enum ERROR_CODE {
    ACCOUNT_SUCCESS = 0,
    ACCOUNT_WRONG_ACCOUNT,
    ACCOUNT_WRONG_PASSWORD,
}

export interface ResponseFormat {
    code: number,
    codeString: string,
    codeDes: string
    data?: {}[]|{}
}

export class AccountManager {
    private db: Db;

    constructor() {
        this.db = new Db();
    }

    signup(account: Account, callback: (err, data) => void) {
        this.db.query(
                `
              insert into db_game.tb_users (account, nickname, password, question, answer)
              values (?, ?, ?, ?, ?);
            `,
            [account.account, account.nickname, account.password, account.question, account.answer],
            (error, results, fields) => {
                callback(error, results);
            }
        )
    }

    login(account: string, callback: (err, data) => void){
        this.db.query(
            `
            select * from tb_users where account=?
            `,
            [account]
            ,
            (error, results, fields)=>{
                callback(error, results);
            }
        )
    }
}
