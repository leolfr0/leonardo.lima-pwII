CREATE DATABASE IF NOT EXISTS crud_funcionarios;
USE crud_funcionarios;

CREATE TABLE IF NOT EXISTS funcionarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    funcao VARCHAR(100) NOT NULL,
    salario DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS administradores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(50) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Conta inicial para o primeiro acesso: admin / 123456
-- Troque a senha após importar este script.
INSERT IGNORE INTO administradores (usuario, senha)
VALUES ('admin', '123456');
