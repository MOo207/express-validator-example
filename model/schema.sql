-- drop database if exists dbo;
create database if not exists dbo;
use dbo;

create table `users`(
uid int primary key auto_increment,
`name` varchar(50) not null,
iqama varchar(10) not null,
phone varchar(10) not null
);
