
const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) ?? []
const setLocalStorage = (dbClient) => localStorage.setItem("db_client", JSON.stringify(dbClient))
//CRUD

const createClient = (client) => {
    const dbClient = getLocalStorage()  
    dbClient.push(client)
    setLocalStorage(dbClient)  
}

const readClient = () => getLocalStorage()

const updateClient = (index, client) => {
    const dbClient = readClient()
    dbClient[index] = client
    setLocalStorage(dbClient)
}

const deleteClient = (index) => {
    const dbClient = readClient()
    dbClient.splice(index, 1)
    setLocalStorage(dbClient)
}

//interacao com layout

const isValidFields = () => {
    return document.getElementById('form').reportValidity()
}

const saveClient = () => {
    if(isValidFields()) {
        const client = {
            cpf: document.getElementById('cpf').value,
            nome: document.getElementById('nome').value,
            cargo: document.getElementById('cargo').value,
            salario: document.getElementById('salario').value,
        }
        createClient(client)
        updateTable()
    }
}

saveClientEdited = (index) => {
    if(isValidFields) {
        const clientEdited = {
            cpf: document.getElementById('cpfEditado').value,
            nome: document.getElementById('nomeEditado').value,
            cargo: document.getElementById('cargoEditado').value,
            salario: document.getElementById('salarioEditado').value,
        }
        const index = document.getElementById('cpfEditado').dataset.index
        console.log(clientEdited)
        updateClient(index, clientEdited)
        updateTable()

    }
}

const createRow = (client, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
        <td>${client.cpf}</td>
        <td>${client.nome}</td>
        <td>${client.cargo}</td>
        <td>${client.salario}</td>
        <td>
            <button 
            type="button" 
            class="btn btn-success"
            data-bs-toggle="modal" 
            data-bs-target="#myModal" 
            id="editar-${index}">
            Editar
            </button>

            <button 
            type="button" 
            class="btn btn-danger" 
            id="excluir-${index}">
            Excluir
            </button>
        </td>
    `
    document.querySelector('#tableClient>tbody').appendChild(newRow)
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tableClient>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

/*
const clearFields = () => {
    const fields = document.querySelectorAll('.form-control')
    console.log(fields)
    fields.forEach(field => field.value = "")
}*/

const updateTable = () => {
    const dbClient = readClient()
    clearTable()
    dbClient.forEach(createRow)
}

const fillFields = (client) => {
    document.getElementById('cpfEditado').value = client.cpf,
    document.getElementById('nomeEditado').value = client.nome,
    document.getElementById('cargoEditado').value = client.cargo,
    document.getElementById('salarioEditado').value = client.salario,
    document.getElementById('cpfEditado').dataset.index = client.index
}

const editClient = (index) => {
    const client = readClient()[index]
    client.index = index
    console.log(client)
    fillFields(client)
    /*
    const clientEdited = {
        
    }
    
    console.log(clientEdited);
    dbClient[index] = clientEdited
    setLocalStorage(dbClient)
    */
}


const editDelete = (event) => {
    if(event.target.type == 'button') {
        const [action, index] = event.target.id.split('-')
        

        if(action == 'editar') {
            console.log(action,  index)
            editClient(index)
        } else {
            const response = confirm(`Tem certeza que deseja Excluir?`)
            if(response) {
                deleteClient(index)
                updateTable()
            }
            
        }
    }
}

const test = () => {
    console.log('teste')
}

updateTable()

//eventos
document.getElementById('salvar')
    .addEventListener('click', saveClient)

document.querySelector('#tableClient>tbody')
    .addEventListener('click', editDelete)


//limpando os dados do modal
var myModalEl = document.getElementById('myModal')
myModalEl.addEventListener('hidden.bs.modal', function clearFields() {
    const fields = document.querySelectorAll('.form-control')
    fields.forEach(field => field.value='')
})


