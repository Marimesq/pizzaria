//Aqui vai conter o servidor. Também poderá ser chamado aplicação.

//1- Importar o express
const express = require('express');

//2- Criar o servidor 
const servidor = express();

//3- Definir uma rota neste servidor
//endereço, método, função callback( a ação que o servidor irá realizar 
//quando a requisição chegar)
servidor.get('/usuarios', (req, res)=>{
    console.log("Chegou uma requisição!")
    res.send("Vou te mandar uma lista de usuários...")
})

//4- Por o servidor no modo "aguardando requisição"
servidor.listen(3000)


