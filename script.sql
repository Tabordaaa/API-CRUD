create database Personas;
use Personas;
create table persona (
Id int auto_increment not null primary key,
Nombre varchar(50),
Apellido varchar(50),
Contraseña varchar (250)
)