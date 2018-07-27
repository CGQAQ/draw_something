"use strict";
exports.__esModule = true;
var db_1 = require("./db");
var db = new db_1["default"]();
db.query('select database()')
    .on('result', function (row) {
    console.log(row['database()']);
});
