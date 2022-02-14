let chat = [];
let nome = "";
indow.setInterval(buscarMensagens, 3000);

function cadastrarUser(){
    nome = prompt("Digite seu nome de usuário:");
    let objeto = {name: nome};
    const promissa = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants");
    promessa.then(cadastroBemSucedido);
    promessa.catch(deuErrado);
}

function deuErrado(erro){
    console.log(erro.response);
    let error = parseInt(erro.response.status);
    if(error === 400){
        nome = prompt("Este nome de usuário já está sendo utiliado. Por favor, tente outro nome:");
        let objeto = {name: nome};
        const promessa = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants");
        promessa.then(cadastroBemSucedido);
        promessa.catch(deuErrado);
    }
}

function cadastroBemSucedido(){
    alert("Cadastro bem secedido!");
}

function manterConexao(){
    let objeto = {name: nome};
    const promessa = axios.post("https://mock-api.driven.com.br/api/v4/uol/status", objeto);
}

function buscarMensagens(){
    const promessa = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");
    promessa.then(mostrarMensagem);
}

function mostrarMensagem(resposta){
    chat = resposta.data;
    montarMensagens();
}

function montarMensagens(){
    const data = new Date();
    const time = `${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}`;

    const mensagem = document.querySelector("main");
    mensagem.innerHTML = "";

    for(let i = 0; i < chat.length - 1; i++){
        if(chat[i].type == "message"){
            mensagem.innerHTML += `
                <div class="notificacao mensagem-normal">
                    <p><small>${chat[i].time} </small><b>${chat[i].from}</b> para <b>${chat[i].to}</b> ${chat[i].text}</p>
                </div>
            `;
            if(chat[i].to == nome){
                mensagem.innerHTML += `
                    <div class="notificacao mensagem-reservada">
                        <p><small>${chat[i].time} </small><b>${chat[i].from}</b> reservadamente para <b>${chat[i].to}:</b> ${chat[i].text}</p>
                    </div>
                `;
            }
        }else if(chat[i].type == "status"){
            mensagem.innerHTML += `
                <div class="notificacao mensagem-status">
                    <p><small>${chat[i].time}</small><b>${chat[i].from}</b> ${chat[i].text}</p>
                </div>
            `;
        }
        scrollAuto();
    }
}

function scrollAuto(){
    const todasMsg = document.querySelector('main div');
    const ultimaMsg = todasMsg[todasMsg.legth -1];

    ultimaMsg.scrollIntoView();
}

function addMensagem(){
    const objeto = {
        text: document.querySelector(".mensagem").value,
        from: nome,
        to:"Todos",
        type: "message"
    };

    const promessa = axios.post("https://mock-api.driven.com.br/api/v4/uol/messages", objeto);
    promessa.then(buscarMensagens);
    //promessa.catch();
}

cadastrarUser();
buscarMensagens();
window.setInterval(manterConexao, 5000)

/*function chamarSidebar(){
    const removerSidebarEscondido = document.querySelector(".conteudo-sidebar");
    removerSidebarEscondido.classList.remove(".escondido")
}*/


//Bônus

function telaLogin(){
    let inputUser = document.querySelector(".login")
    const botaoEntrar = document.querySelector(".botao-entrar");
    botaoEntrar.disabled = true;
    inputUser.addEventListener("change", stateHandle);
    
    if(inputUser.value === ""){
        botaoEntrar.disabled = true;
        cadastrarUser();
    }else{
        botaoEntrar.disabled = false;
        const telaDeEntrada = document.querySelector(".tela-de-entrada");
        telaDeEntrada.classList.add(".escondido");
        const telaDoChat = document.querySelector(".conteudo");
        telaDoChat.classList.remove(".escondido");
    }
}