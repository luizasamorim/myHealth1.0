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