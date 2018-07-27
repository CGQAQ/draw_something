"use strict";
exports.__esModule = true;
// @ts-check
var mysql_1 = require("mysql");
var config = {
    host: "localhost",
    port: 8090,
    user: 'root',
    password: 'xmMHWHslsRnzXZlTa0oy',
    database: 'db_game'
};
var Db = /** @class */ (function () {
    function Db() {
        var con = mysql_1.createConnection(config);
        con.connect(function (err) {
            if (err)
                throw err;
            console.log('Mysql connected!');
        });
        this.con = con;
    }
    Db.prototype.query = function (sql) {
        return this.con.query(sql);
    };
    return Db;
}());
exports["default"] = Db;
