// importações
import { auth, db } from '../../config/firebase.js'
import { sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js"

//getters e setters
const getEmail = () => {
    return document.getElementById('email').value
} 

// recuperar elementos
const erro = () => {
    return document.getElementById('erro')
}

const spinner = () => {
    return document.getElementById('spinner')
}

const btn = () => {
    return document.getElementById('btnRedefinirSenha')
}

// funções
const redefinirSenha = () => {
    erro().classList.add('entrada-invalida')
    btn().classList.add('entrada-invalida')
    spinner().classList.remove('entrada-invalida')
    
    const email = getEmail()

    sendPasswordResetEmail(auth, email)
    .then(() => {
        console.log('foi');
    })
    .catch((error) => {
        console.log(error)
        erro().classList.remove('entrada-invalida')
        if(error.code === "auth/user-not-found"){
            erro().innerHTML = 'Não existe usuário com este e-mail!'
        } else {
            erro().innerHTML = 'Ocorreu um erro!'
        }
    })
    .finally( () => {
        spinner().classList.add('entrada-invalida')
        btn().classList.remove('entrada-invalida')
    })
    
} 


// carregamento da pgn
window.onload = () => {
    btn().addEventListener('click', () => {redefinirSenha()})
}


function recuperarSenha() {
    var email = document.getElementById('email').value
    var erro = document.getElementById('erro')

    if (validaEmail(email)) {
        window.location = '../index/index.html'
    } else {
        erro.innerHTML = 'Email inválido!'
        erro.classList.remove('entrada-invalida')
    }
}

function validaEmail(field) {
    usuario = field.substring(0, field.indexOf("@"));
    dominio = field.substring(field.indexOf("@")+ 1, field.length);
    
    if ((usuario.length >=1) &&
        (dominio.length >=3) &&
        (usuario.search("@")==-1) &&
        (dominio.search("@")==-1) &&
        (usuario.search(" ")==-1) &&
        (dominio.search(" ")==-1) &&
        (dominio.search(".")!=-1) &&
        (dominio.indexOf(".") >=1)&&
        (dominio.lastIndexOf(".") < dominio.length - 1)) {
        return true
    }
    else{
        return false
    }
}