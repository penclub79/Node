const mysql = require('mysql2/promise');
const {logger} = require('./winston'); //log관리-> 서버동작 파악하거나 오류찾을때 도움됌.

// TODO: 본인의 DB 계정 입력
// aws 자신의 ec2 인스턴스를 자신의 RDS 데이터베이스 인스턴스 인바운드 규칙을 추가해줘야 연결가능
const pool = mysql.createPool({
    host: 'softsq-database.cdyn7brw0fzh.us-east-2.rds.amazonaws.com',
    user: 'admin',
    port: '3306',
    password: 'tlsghcjf12!',
    database: 'musinsaV4'
});

module.exports = {
    pool: pool
};