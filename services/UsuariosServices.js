//Importando em uma constante o arquivo com os usuários
const usuarios = require('../databases/usuarios.json')
//Importando a biblioteca fs
const fs = require('fs')
//Importando a biblioteca bcrypt para a função cadastrar
const bcrypt = require('bcrypt');


function listar(){
    
    console.table(usuarios.map((usuario) => {return{id: usuario.id, nome: usuario.nome, email: usuario.email}}))
   
}

function salvar(arrayDeUsuarios){

    fs.writeFileSync('./databases/usuarios.json', JSON.stringify(arrayDeUsuarios, null, 4))
}

function cadastrar(objeto){
    let novoId = usuarios[usuarios.length -1].id + 1 
    let senhaCriptografada = bcrypt.hashSync(objeto.senha, 10)
    let usuario = {
        id: novoId,
        nome: objeto.nome,
        email: objeto.email,
        senha: senhaCriptografada,
        enderecos: [objeto.endereco],
        formasDePagamento: []
    }
    usuarios.push(usuario)
    fs.writeFileSync("./databases/usuarios.json",JSON.stringify(usuarios,null,4))

}

function detalhar(idUsuario){
    let usuarioDetalhado = usuarios.find(u => u.id == idUsuario)
    
    console.log("Nome: " + usuarioDetalhado.nome)
    console.log("E-mail: " + usuarioDetalhado.email)

    console.log("\n Endereços")
    console.table(usuarioDetalhado.enderecos)

    console.log("\n Formas de pagamento")
    console.table(usuarioDetalhado.formasDePagamento)
}

function remover(idDoUsuarioParaRemover){

    let novoArray = usuarios.filter(u => u.id != idDoUsuarioParaRemover)
    salvar(novoArray)    

}

function alterar(novosDados, idUsuario){
    let usuarioParaAlterar = usuarios.find(u => u.id === idUsuario)
    console.log(usuarioParaAlterar)
    
    usuarios[usuarioParaAlterar].nome = novosDados.nome
    usuarios[usuarioParaAlterar].email = novosDados.email
    usuarios[usuarioParaAlterar].senha = novosDados.senha

    salvar(usuarios)
}

function addEndereco(novoEndereco, idUsuario){
    let usuarioParaAlterar = usuarios.findIndex(u => u.id === idUsuario)

    usuarios[usuarioParaAlterar].enderecos.push(novoEndereco)

    salvar(usuarios)
}

function removerEndereco(posicaoDoEndereco, idUsuario){
    let usuarioParaAlterar = usuarios.findIndex(u => u.id === idUsuario)

    usuarios[usuarioParaAlterar].enderecos.splice(posicaoDoEndereco, 1)

    salvar(usuarios)
}

function alterarEndereco(posicaoDoEndereco, novoEndereco, idUsuario){
    let usuarioParaAlterar = usuarios.findIndex(u => u.id === idUsuario)

    usuarios[usuarioParaAlterar].enderecos.splice(posicaoDoEndereco, 1, novoEndereco)

    salvar(usuarios)
       
}

function addFormaDePagamento(novaFormaDePagamento, idUsuario){
    let usuarioParaAlterar = usuarios.findIndex(u => u.id === idUsuario)
    
    usuarios[usuarioParaAlterar].formasDePagamento.push(novaFormaDePagamento)

    salvar(usuarios)
}

function removerFormaDePagamento(posicaoDaFormaDePagamento, idUsuario){
    let usuarioParaAlterar = usuarios.findIndex(u => u.id === idUsuario)
    
    usuarios[usuarioParaAlterar].formasDePagamento.splice(posicaoDaFormaDePagamento, 1)

    salvar(usuarios)
}

function alterarFormaDePagamento(novaFormaDePagamento, posicaoDaFormaDePagamento, idUsuario){
    let usuarioParaAlterar = usuarios.findIndex(u => u.id === idUsuario)
    
    usuarios[usuarioParaAlterar].formasDePagamento.splice(posicaoDaFormaDePagamento, 1, novaFormaDePagamento)

    salvar(usuarios)
}


//Objeto que contém todas as funções
//Função salvar não precisa ser exportada
const UsuariosServices = {
    cadastrar,
    listar,
    detalhar,
    remover,
    alterar,
    addEndereco,
    removerEndereco,
    alteraEndereco: alterarEndereco,
    addFormaDePagamento,
    removerFormaDePagamento,
    alterarFormaDePagamento
}

module.exports = UsuariosServices;
