create table tb_users(
  id int ,
  nick varchar(50) not null ,
  password varchar (50) not null,
  question varchar (100) not null,
  answer varchar (100) not null,
  signup datetime default current_timestamp ,
  lastseen datetime default current_timestamp,
  primary key (id)
)
