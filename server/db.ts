// @ts-check
import {createConnection, ConnectionConfig, Connection, queryCallback} from "mysql";


const config: ConnectionConfig = {
    host: "localhost",
    port: 8090,
    user: 'root',
    password: 'xmMHWHslsRnzXZlTa0oy',
    database: 'db_game'
};

export default class Db{
    private con: Connection;
    constructor(){
        const con = createConnection(config);

        con.connect((err) => {
            if( err ) throw err;
            console.log('Mysql connected!');
        });
        this.con = con;
    }

    query(sql: string, params: string[], callback: queryCallback){
        return this.con.query(sql, params, callback)
    }
}
