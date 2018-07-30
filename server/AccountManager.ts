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

export interface ResponseFormat {
    code: number,
    codeString: string,
    codeDes: string
    data?: {}[]|{}
}

export class AccountManager {
    db: Db;

    constructor() {
        this.db = new Db();
    }

    signup(account: Account, res: Response) {
        this.db.query(
                `
              insert into db_game.tb_users (account, nickname, password, question, answer)
              values (?, ?, ?, ?, ?);
            `,
            [account.account, account.nickname, account.password, account.question, account.answer],
            (error, results, fields) => {
                if(error){
                    console.warn('--- signup warning ---');
                    console.warn(error.errno);
                    console.warn(error.code);
                    console.warn(error.sqlMessage);
                    console.warn('--- end warning ---');
                    res.json(<ResponseFormat>{
                        code: error.errno,
                        codeString: error.code,
                        codeDes: error.sqlMessage,
                    });
                }
                else{
                    res.json(<ResponseFormat>{
                       code: 0,
                       codeString: 'success',
                       codeDes: 'exec success' ,
                    });
                }
            }
        )
    }
}
