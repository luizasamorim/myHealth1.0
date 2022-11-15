// importações
import { auth } from '../../config/firebase.js'
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js"

// getters e setters
const getEmail = () => {
    return document.getElementById('email').value
} 

const getSenha = () => {
    return document.getElementById('password').value
}

// recupera elementos html
const erro = () => {
    return document.getElementById('erro')
}

const spinner = () => {
    return document.getElementById('spinner')
}

const btn = () => {
    return document.getElementById('btnEntrar')
}

// funções
const entrar = () => {
    const email = getEmail()
    const senha = getSenha()

    btn().classList.add('entrada-invalida')
    spinner().classList.remove('entrada-invalida')

    signInWithEmailAndPassword(auth, email, senha)
    .then((user) => {
        console.log(JSON.stringify(user))
        window.location.href = "../home/home.html"
    })
    .catch( (error) => {
        console.log(error)
        erro().classList.remove('entrada-invalida')
    })
    .finally( () => {
        spinner().classList.add('entrada-invalida')
        btn().classList.remove('entrada-invalida')
    })
}

// carregamento da pgn
window.onload = () => {
    btn().addEventListener('click', () => {entrar()})
}