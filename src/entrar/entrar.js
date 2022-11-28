// importações
import { db, auth } from '../../config/firebase.js'
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js"
import { query, collection, onSnapshot, where } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js"

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
        const q = query(collection(db, "usuarios"), where("id", "==", user.user.uid))

        onSnapshot(q, (results) => {
            results.forEach((documento) => {
                window.location.href = "../home/home.html?docUserId=" + documento.id
            })
        })
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