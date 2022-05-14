-- database
\c postgres;

drop database if exists transportSales;

create database transportSales;

\c transportsales

-- type
CREATE TYPE gen AS ENUM ('female', 'male');
CREATE TYPE col AS ENUM ('red', 'green', 'black', 'white', 'blue', 'brown', 'orange', 'yellow', 'gray');
CREATE TYPE adr AS ENUM ('Tashkent', 'Andijon', 'Buxoro', 'Farg''ona', 'Jizzax', 'QoraQalpoqiston', 'Qashqadaryo', 'Xorazm', 'Namangan', 'Navoiy', 'Samarqand', 'Surxandaryo', 'Sirdaryo');

-- table
create table branches (
  branchId serial primary key,
  branchName varchar(30) unique not null,
  branchAddedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  branchAdress adr
);

create table staffs (
  staffId serial primary key,
  branchId int not null references branches(branchId) on delete cascade,
  staffName varchar(30) not null,
  password varchar(30) unique not null,
  birthdate date not null,
  gender gen
);

create table permissions (
  permissionId serial primary key,
  staffId int not null references staffs(staffId) ON DELETE CASCADE,
  add_transport text,
  change_transport text,
  delete_transport text,
  add_branch boolean default false,
  change_branch text,
  delete_branch text,
  toAll boolean default false,
  read_transport boolean default false,
  read_branch boolean default false,
  read_permission boolean default false,
  read_stuff boolean default false
);

create table transports (
  transportId serial primary key,
  branchId int not null  references branches(branchId) ON DELETE CASCADE,
  model varchar(30) unique not null,
  color col,
  img text not null,
  transportAddedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
