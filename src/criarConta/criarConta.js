var nome
var nascimento
var email
var password
var password2
var sexo
var erro

function criarConta() {
    erro = document.getElementById('erro')
    erro.classList.add('entrada-invalida')

    nome = document.getElementById('nome').value
    nascimento = document.getElementById('nascimento').value
    email = document.getElementById('email').value
    password = document.getElementById('password').value
    password2 = document.getElementById('password2').value
    sexo = ''
    document.getElementsByName('sexo').forEach(element => {
        if (element.checked) {
            sexo = element.value
        }
    });

    if (!localStorage.getItem('usuarios')) {
        localStorage.setItem('usuarios', '[]')
    }
    
    if (validaCampos()) {
        usuarios = JSON.parse(localStorage.getItem('usuarios'))
    
        var usuario = {'nome': nome, 'sexo': sexo, 'nascimento': nascimento, 'email': email, 'password': password}

        usuarios.push(usuario)

        localStorage.setItem('usuarios', JSON.stringify(usuarios))

        window.location = '../home/home.html'
    }else{
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

function validaCampos() {
    if (!nome || !sexo || !nascimento || !email || !password || !password2) {
        erro.innerHTML = 'Nenhum campo pode ficar em branco!'
        return false
    } else if (!validaEmail(email)) {
        erro.innerHTML = 'Email inválido!'
        return false
    } else if (password != password2) {
        erro.innerHTML = 'Senha não confere!'
        return false
    } else return true
}