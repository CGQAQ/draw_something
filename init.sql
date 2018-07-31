create database if not exists db_game character set utf8 collate utf8_general_ci;

-- use db
use db_game;
-- create user table 
create table tb_users(
	id bigint auto_increment,
    account  varchar(20)  not null ,
    nickname varchar(15)  not null,
    password varchar(100) not null,
    question varchar (50) not null,
    answer varchar (100) not null,
    signup datetime default current_timestamp ,
    lastseen datetime default current_timestamp,
    active char(1) default 'y' not null,
    primary key(id),
    unique key (account)
);
-- sample data 
insert into db_game.tb_users (account, nickname, password, question, answer)
values('cg', 'CG', 'zxc123..', 'who am I?', 'Jason');