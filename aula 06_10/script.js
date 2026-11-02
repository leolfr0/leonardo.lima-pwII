const modal = document.querySelector('.modal-container');
const tbody = document.querySelector('tbody');
const sNome = document.querySelector('#m-nome');
const sFuncao = document.querySelector('#m-funcao');
const sSalario = document.querySelector('#m-salario');
const btnSalvar = document.querySelector('#btnSalvar');

const API_BASE = 'http://localhost:3000/api/funcionarios';

let itens = [];
let id = null;

function openModal(edit = false, index = 0) {
    modal.classList.add('active');

    modal.onclick = e => {
        if (e.target.className.indexOf('modal-container') !== -1) {
            modal.classList.remove('active');
        }
    };

    if (edit) {
        sNome.value = itens[index].nome;
        sFuncao.value = itens[index].funcao;
        sSalario.value = itens[index].salario;
        id = itens[index].id;
    } else {
        sNome.value = '';
        sFuncao.value = '';
        sSalario.value = '';
        id = null;
    }
}

function editItem(index) {
    openModal(true, index);
}

async function deleteItem(index) {
    const item = itens[index];
    if (!item?.id) return;

    try {
        await fetch(`${API_BASE}/${item.id}`, { method: 'DELETE' });
        loadItens();
    } catch (error) {
        console.error('Erro ao deletar:', error);
    }
}

function insertItem(item, index) {
    const tr = document.createElement('tr');

    tr.innerHTML = `
        <td>${item.nome}</td>
        <td>${item.funcao}</td>
        <td>R$ ${Number(item.salario).toFixed(2)}</td>
        <td class="acao">
            <button onclick="editItem(${index})"><i class='bx bx-edit'></i></button>
        </td>
        <td class="acao">
            <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
        </td>
    `;

    tbody.appendChild(tr);
}

btnSalvar.onclick = async e => {
    if (sNome.value === '' || sFuncao.value === '' || sSalario.value === '') {
        return;
    }

    e.preventDefault();

    try {
        if (id !== null) {
            await fetch(`${API_BASE}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nome: sNome.value,
                    funcao: sFuncao.value,
                    salario: sSalario.value
                })
            });
        } else {
            await fetch(API_BASE, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nome: sNome.value,
                    funcao: sFuncao.value,
                    salario: sSalario.value
                })
            });
        }

        modal.classList.remove('active');
        loadItens();
        id = null;
    } catch (error) {
        console.error('Erro ao salvar:', error);
        alert('Erro ao salvar. Verifique se o servidor está rodando.');
    }
};

const getItensBD = async () => {
    try {
        const response = await fetch(API_BASE);
        if (!response.ok) throw new Error('Erro ao carregar');
        return await response.json();
    } catch (error) {
        console.error('erro API:', error);
        return [];
    }
};

async function loadItens() {
    itens = await getItensBD();
    tbody.innerHTML = '';
    itens.forEach((item, index) => {
        insertItem(item, index);
    });
}

loadItens();