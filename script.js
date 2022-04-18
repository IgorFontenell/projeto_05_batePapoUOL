let nickname = "";
let promise = "";
let miniContador = 0;
let conversas;


//Nessa função perguntamos o nome do usuário e conferimos se o servidor aceita
function login () {

nickname = prompt ("Qual o seu nickname, meu caro?");
if(nickname === null) {
    login();
}
let nome = {
    name: `${nickname}`
};

let requisicao = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", nome);
requisicao.then(entrarNaSala);
requisicao.catch(erroLogin);
}

login();



//Nessa função nós analisamos o erro e informamos ao usuário
function erroLogin (erro) {
    alert ("Ops...");
    
    if (statusCode === 400) {
        alert ("Nome indisponível. Favor escolher outro");
        login ();
    } else {
        login();
    }
}

//Aqui temos a função que coloca o ato de entrar na sala no html.
function entrarNaSala () {
    alert ("Seu nome está disponível. Bem vindo!");
    console.log("entrou no servidor");
    let procura = document.querySelector(".container");
    procura.innerHTML = procura.innerHTML +
    `<div class="login">
    <span><strong>${nickname}</strong> entra na sala...</span>
        </div>` 
    
}

//Aqui faremos uma função que enviará a informação de que o usuário continua online
function status () {

    let nome = {
        name: `${nickname}`
    };
    let requisicao = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", nome);
    requisicao.then(console.log("avisei que estou online!"));
}
setInterval(status, 4000);



//Aqui nós pegamos as mensagens do servidor e, ao pegarmos, aplicaremos a função mensagensDom que enviará-las para o nosso HTML
function verificarMensagens() {
    promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promise.then(mensagensDom);
    promise.catch(erroPegarMensagem);
 }
 setInterval(verificarMensagens, 2500);
 
 


// Função que coloca as mensagens no nosso DOM :) 
function mensagensDom (response) {
    console.log("peguei as mensagens");
    conversas = response.data;
    let procura = document.querySelector(".container");
        procura.innerHTML = "";

    for(let i = 0; i < conversas.length; i++) {

        if(conversas[i].type === "status") {
            let procura = document.querySelector(".container");
            procura.innerHTML = procura.innerHTML +
             `<div class="login contador${i+1}">
                <span><strong>${conversas[i].from}</strong> ${conversas[i].text}</span>
             </div>` 
            
        }
        if(conversas[i].type === "message") {
            let procura = document.querySelector(".container");
            procura.innerHTML = procura.innerHTML +
             `<div class="conteudo contador${i+1}">
                <span><strong>${conversas[i].from}</strong> para <strong>${conversas[i].to}</strong>: ${conversas[i].text}</span>
             </div>` 
            
        }
        if(conversas[i].type === "private_message") {
                let procura = document.querySelector(".container");
            procura.innerHTML = procura.innerHTML +
             `<div class="reservado contador${i+1}">
                <span><strong>${conversas[i].from}</strong> reservadamente para <strong>${conversas[i].to}</strong>: ${conversas[i].text}</span>
             </div>`
            }
             
             
        }
       
        let procuras = document.querySelector(`.contador${i+1}`);
             procuras.scrollIntoView();
    }
    
    


function erroPegarMensagem(erro) {

    alert("Tivemos um erro para conseguir as mensagens do servidor!!");

}



//Função que pega o que foi escrito no input e o envia ao servidor
function enviarMensagem () {

    let texto = document.querySelector('input').value;
    let textoEnviado = {
        from: `${nickname}`,
        to: `Todos`,
        text: `${texto}`,
        type: `message`
        }

    let requisicao = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", textoEnviado);
    console.log(requisicao);
    requisicao.then(verificarMensagens);
    requisicao.catch(reload);

}

function efeitoNoButtom() {
    let procura = document.querySelector(".icone-bottom")
    procura.classList.add("click");
    procura.classList.remove("click");
}


    let btnClear = document.querySelector('button');
    let inputs = document.querySelectorAll('input');
    btnClear.addEventListener('click', () => {
        inputs.forEach(input =>  input.value = '');
    });
    efeitoNoButtom();



function reload () {
    window.location.reload();
}





document.addEventListener("keypress", function(e) {
    if(e.key === 'Enter') {
    
        let btn = document.querySelector(".botao");
      
      btn.click();
    
    }
  });