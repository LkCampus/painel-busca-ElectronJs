READMI
//instalar módulos necessários
...\loja> npm start

//criar banco de dados mysql para pegar dados
CREATE DATABASE loja;
CREATE TABLE dados(
    id INT AUTO_INCREMENT PRIMARY KEY,
    modelo VARCHAR(20),
    tamanho VARCHAR(2),
    quantidade INT(5),
    cor VARCHAR(10)
);