const API_BASE = 'http://localhost:3000/api';
const TOKEN_KEY = 'crud_admin_token';

const loginScreen = document.querySelector('#login-screen');
const appScreen = document.querySelector('#app');
const loginForm = document.querySelector('#login-form');
const loginMessage = document.querySelector('#login-message');
const logoutButton = document.querySelector('#logout');
const newButton = document.querySelector('#new');
const modal = document.querySelector('.modal-container');
const employeeForm = document.querySelector('#employee-form');
const cancelModalButton = document.querySelector('#cancel-modal');
const tableMessage = document.querySelector('#table-message');
const tbody = document.querySelector('tbody');
const sNome = document.querySelector('#m-nome');
const sFuncao = document.querySelector('#m-funcao');
const sSalario = document.querySelector('#m-salario');

let itens = [];
let editingId = null;

function getToken() {
    return sessionStorage.getItem(TOKEN_KEY);
}

function showLogin(message = '') {
    sessionStorage.removeItem(TOKEN_KEY);
    appScreen.classList.add('hidden');
    loginScreen.classList.remove('hidden');
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    tbody.replaceChildren();
    loginMessage.textContent = message;
}

function showApp() {
    loginScreen.classList.add('hidden');
    appScreen.classList.remove('hidden');
    loginMessage.textContent = '';
}

async function apiRequest(path, options = {}) {
    const headers = new Headers(options.headers || {});
    const token = getToken();

    if (token) headers.set('Authorization', `Bearer ${token}`);
    if (options.body && !headers.has('Content-Type')) {
        headers.set('Content-Type', 'application/json');
    }

    const response = await fetch(`${API_BASE}${path}`, { ...options, headers });
    const data = await response.json().catch(() => ({}));

    if (response.status === 401) {
        showLogin('Sua sessão expirou. Entre novamente.');
        throw new Error(data.error || 'Não autenticado');
    }
    if (!response.ok) throw new Error(data.error || 'A solicitação não foi concluída.');

    return data;
}

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    loginMessage.textContent = '';

    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value;

    try {
        const response = await fetch(`${API_BASE}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
            loginMessage.textContent = data.error || 'Usuário ou senha inválidos.';
            return;
        }

        sessionStorage.setItem(TOKEN_KEY, data.token);
        loginForm.reset();
        showApp();
        await loadItens();
    } catch (error) {
        console.error('Erro no login:', error);
        loginMessage.textContent = 'Não foi possível conectar ao servidor.';
    }
});

logoutButton.addEventListener('click', async () => {
    try {
        await apiRequest('/logout', { method: 'POST' });
    } catch (error) {
        // Sempre encerra a sessão local, mesmo se o servidor estiver indisponível.
        console.warn('Não foi possível notificar o servidor do logout:', error);
    } finally {
        showLogin();
    }
});

function openModal(edit = false, index = 0) {
    if (!getToken()) {
        showLogin('Entre para alterar os dados.');
        return;
    }

    editingId = edit ? itens[index].id : null;
    sNome.value = edit ? itens[index].nome : '';
    sFuncao.value = edit ? itens[index].funcao : '';
    sSalario.value = edit ? itens[index].salario : '';
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    sNome.focus();
}

function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    employeeForm.reset();
    editingId = null;
}

newButton.addEventListener('click', () => openModal());
cancelModalButton.addEventListener('click', closeModal);
modal.addEventListener('click', (event) => {
    if (event.target === modal) closeModal();
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('active')) closeModal();
});

function createActionButton(iconClass, label, onClick) {
    const button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('aria-label', label);
    button.title = label;

    const icon = document.createElement('i');
    icon.className = `bx ${iconClass}`;
    button.appendChild(icon);
    button.addEventListener('click', onClick);
    return button;
}

function insertItem(item, index) {
    const row = document.createElement('tr');
    const nameCell = document.createElement('td');
    const functionCell = document.createElement('td');
    const salaryCell = document.createElement('td');
    const editCell = document.createElement('td');
    const deleteCell = document.createElement('td');

    nameCell.textContent = item.nome;
    functionCell.textContent = item.funcao;
    salaryCell.textContent = `R$ ${Number(item.salario).toFixed(2)}`;
    editCell.className = 'acao';
    deleteCell.className = 'acao';
    editCell.appendChild(createActionButton('bx-edit', 'Editar funcionário', () => openModal(true, index)));
    deleteCell.appendChild(createActionButton('bx-trash', 'Excluir funcionário', () => deleteItem(index)));

    row.append(nameCell, functionCell, salaryCell, editCell, deleteCell);
    tbody.appendChild(row);
}

employeeForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!getToken()) {
        showLogin('Entre para alterar os dados.');
        return;
    }

    const payload = {
        nome: sNome.value.trim(),
        funcao: sFuncao.value.trim(),
        salario: sSalario.value
    };

    try {
        const path = editingId === null ? '/funcionarios' : `/funcionarios/${editingId}`;
        await apiRequest(path, {
            method: editingId === null ? 'POST' : 'PUT',
            body: JSON.stringify(payload)
        });
        closeModal();
        await loadItens();
    } catch (error) {
        console.error('Erro ao salvar:', error);
        alert(error.message || 'Erro ao salvar os dados.');
    }
});

async function deleteItem(index) {
    if (!getToken()) {
        showLogin('Entre para alterar os dados.');
        return;
    }

    const item = itens[index];
    if (!item?.id || !window.confirm(`Excluir o cadastro de ${item.nome}?`)) return;

    try {
        await apiRequest(`/funcionarios/${item.id}`, { method: 'DELETE' });
        await loadItens();
    } catch (error) {
        console.error('Erro ao excluir:', error);
        alert(error.message || 'Erro ao excluir o cadastro.');
    }
}

async function loadItens() {
    if (!getToken()) return;

    tableMessage.textContent = 'Carregando...';
    try {
        itens = await apiRequest('/funcionarios');
        tbody.replaceChildren();
        itens.forEach(insertItem);
        tableMessage.textContent = itens.length ? '' : 'Nenhum funcionário cadastrado.';
    } catch (error) {
        if (getToken()) {
            console.error('Erro ao carregar funcionários:', error);
            tableMessage.textContent = 'Não foi possível carregar os funcionários.';
        }
    }
}

if (getToken()) {
    showApp();
    loadItens();
} else {
    showLogin();
}
