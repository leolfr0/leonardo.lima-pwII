const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const crypto = require('crypto');
const app = express();

app.use(cors());
app.use(express.json());

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'crud_funcionarios'
};

const db = mysql.createPool(dbConfig);
const sessions = new Map();

function requireAuth(req, res, next) {
    const authorization = req.get('Authorization') || '';
    const token = authorization.startsWith('Bearer ') ? authorization.slice(7) : '';

    if (!token || !sessions.has(token)) {
        return res.status(401).json({ error: 'Não autenticado. Faça login para continuar.' });
    }

    req.admin = sessions.get(token);
    req.authToken = token;
    next();
}

app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (typeof username !== 'string' || typeof password !== 'string' || !username.trim() || !password) {
            return res.status(400).json({ error: 'Informe usuário e senha.' });
        }

        const [rows] = await db.execute(
            'SELECT id, usuario FROM administradores WHERE usuario = ? AND senha = ? LIMIT 1',
            [username.trim(), password]
        );

        if (rows.length === 0) {
            return res.status(401).json({ error: 'Usuário ou senha inválidos.' });
        }

        const token = crypto.randomBytes(32).toString('hex');
        sessions.set(token, { id: rows[0].id, usuario: rows[0].usuario });
        return res.json({ success: true, token, usuario: rows[0].usuario });
    } catch (error) {
        console.error('Erro no login:', error);
        return res.status(500).json({ error: 'Erro ao validar o login. Verifique a tabela administradores.' });
    }
});

app.post('/api/logout', requireAuth, (req, res) => {
    sessions.delete(req.authToken);
    res.json({ success: true });
});

app.get('/api/funcionarios', requireAuth, async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM funcionarios ORDER BY id DESC');
        res.json(rows);
    } catch (error) {
        console.error('Erro ao listar funcionários:', error);
        res.status(500).json({ error: 'Não foi possível carregar os funcionários.' });
    }
});

app.post('/api/funcionarios', requireAuth, async (req, res) => {
    try {
        const { nome, funcao, salario } = req.body;
        const valorSalario = Number(salario);

        if (typeof nome !== 'string' || !nome.trim() || typeof funcao !== 'string' || !funcao.trim()
            || salario === '' || !Number.isFinite(valorSalario) || valorSalario < 0) {
            return res.status(400).json({ error: 'Informe nome, função e um salário válido.' });
        }

        const [result] = await db.execute(
            'INSERT INTO funcionarios (nome, funcao, salario) VALUES (?, ?, ?)',
            [nome.trim(), funcao.trim(), valorSalario]
        );

        res.status(201).json({ success: true, id: result.insertId });
    } catch (error) {
        console.error('Erro ao incluir funcionário:', error);
        res.status(500).json({ error: 'Não foi possível incluir o funcionário.' });
    }
});

app.put('/api/funcionarios/:id', requireAuth, async (req, res) => {
    try {
        const { nome, funcao, salario } = req.body;
        const valorSalario = Number(salario);
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id < 1 || typeof nome !== 'string' || !nome.trim()
            || typeof funcao !== 'string' || !funcao.trim() || salario === ''
            || !Number.isFinite(valorSalario) || valorSalario < 0) {
            return res.status(400).json({ error: 'Informe dados válidos para atualizar o funcionário.' });
        }

        const [result] = await db.execute(
            'UPDATE funcionarios SET nome = ?, funcao = ?, salario = ? WHERE id = ?',
            [nome.trim(), funcao.trim(), valorSalario, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Funcionário não encontrado.' });
        }
        res.json({ success: true });
    } catch (error) {
        console.error('Erro ao atualizar funcionário:', error);
        res.status(500).json({ error: 'Não foi possível atualizar o funcionário.' });
    }
});

app.delete('/api/funcionarios/:id', requireAuth, async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (!Number.isInteger(id) || id < 1) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        const [result] = await db.execute('DELETE FROM funcionarios WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Funcionário não encontrado.' });
        }
        res.json({ success: true });
    } catch (error) {
        console.error('Erro ao excluir funcionário:', error);
        res.status(500).json({ error: 'Não foi possível excluir o funcionário.' });
    }
});

const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log('Rotas: /api/login, /api/logout e /api/funcionarios');
});
