// importações
import { auth, db } from '../../config/firebase.js'
import { addDoc, collection } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import {createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js"

//getters e setters
const getNome = () => {
    return document.getElementById('nome').value
} 

const getSexo = () => {
    var sexo = undefined
    document.getElementsByName('sexo').forEach((element) => {
        if (element.checked) {
            sexo = element.value
        }
    });
    return sexo
} 

const getNascimento = () => {
    return document.getElementById('nascimento').value
} 

const getEmail = () => {
    return document.getElementById('email').value
} 

const getSenha = () => {
    return document.getElementById('password').value
} 

const getConfirmacao = () => {
    return document.getElementById('password2').value
} 

// recuperar elementos
const erro = () => {
    return document.getElementById('erro')
}

const spinner = () => {
    return document.getElementById('spinner')
}

const btn = () => {
    return document.getElementById('btnCadastrar')
}

// funções
const cadastrar = () => {
    erro().classList.add('entrada-invalida')
    btn().classList.add('entrada-invalida')
    spinner().classList.remove('entrada-invalida')

    if (validaCampos()) {
        const email = getEmail()
        const senha = getSenha()

        createUserWithEmailAndPassword(auth, email, senha)
        .then((user) => {
            console.log(JSON.stringify(user.user.uid))
            addDoc(collection(db, "usuarios"), {
                id: user.user.uid,
                nome: getNome(),
                sexo: getSexo(),
                nascimento: getNascimento()
            })
            .then((document) => {
                console.log(document);
                console.log('deu bom');
                // window.location.href = "../home/home.html"
            })
            .catch((error) => {
                console.log(error)
            })
        })
        .catch((error) => {
            console.log(error.code)
            if(error.code === "auth/email-already-in-use"){
    	        erro().innerHTML = 'Já existe usuário com este e-mail!'
            } else {
                console.log('aaaaaa');
            }
        })
        .finally( () => {
            spinner().classList.add('entrada-invalida')
            btn().classList.remove('entrada-invalida')
        })
        
    }
    
} 

function validaEmail(field) {
    let usuario = field.substring(0, field.indexOf("@"));
    let dominio = field.substring(field.indexOf("@")+ 1, field.length);
    
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

function validaCampos() {    
    if (!getNome() || !getSexo() || !getNascimento() || !getEmail() || !getSenha() || !getConfirmacao()) {
        erro().innerHTML = 'Nenhum campo pode ficar em branco!'
        return false
    } else if (!validaEmail(getEmail())) {
        erro().innerHTML = 'Email inválido!'
        return false
    } else if (getSenha() != getConfirmacao()) {
        erro().innerHTML = 'Senha não confere!'
        return false
    } else {
        return true
    }
}

// carregamento da pgn
window.onload = () => {
    btn().addEventListener('click', () => {cadastrar()})
}