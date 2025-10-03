CREATE DATABASE Petshop;
USE Petshop;

CREATE TABLE dono (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_completo VARCHAR(255) NOT NULL,
    cpf VARCHAR(14) NOT NULL,
    email VARCHAR(255) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    endereco VARCHAR(255) NOT NULL
);

CREATE TABLE animal (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_dono INT NOT NULL,
    nome_pet VARCHAR(255) NOT NULL,
    especie VARCHAR(100) NOT NULL,
    raca VARCHAR(100) NOT NULL,
    data_nascimento DATE NOT NULL,
    observacoes TEXT,
    FOREIGN KEY (id_dono) REFERENCES dono(id) 
);