function criarConta() {
    var nome = document.getElementById('nome').value
    var nascimento = document.getElementById('nascimento').value
    var email = document.getElementById('email').value
    var password = document.getElementById('password').value
    var password2 = document.getElementById('password2').value
    var sexo = ''
    document.getElementsByName('sexo').forEach(element => {
        if (element.checked) {
            sexo = element.value
        }
    });

    if (!localStorage.getItem('usuarios')) {
        localStorage.setItem('usuarios', '[]')
    }
    
    if (validaEmail(email) == true && password == password2) {
        usuarios = JSON.parse(localStorage.getItem('usuarios'))
    
        var usuario = {'nome': nome, 'sexo': sexo, 'nascimento': nascimento, 'email': email, 'password': password}

        usuarios.push(usuario)

        localStorage.setItem('usuarios', JSON.stringify(usuarios))

        window.location = '../home/home.html'
    }else{
        var element = document.getElementsByClassName('entrada-invalida')
        element[0].classList.remove('entrada-invalida')  
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






// var element = document.getElementsByClassName('entrada-invalida')
    // if (!nome) {
    //     element[0].innerHTML = 'O nome deve ser preenchido!'
    //     element[0].classList.remove('entrada-invalida')
    // } else if (!sexo){
    //     element[0].innerHTML = 'O sexo deve ser preenchido!'
    //     element[0].classList.remove('entrada-invalida')
    // } else if (!nascimento){
    //     element[0].innerHTML = 'O nascimento deve ser preenchido!'
    //     element[0].classList.remove('entrada-invalida')
    // } else if (!email || !validaEmail()){
    //     element[0].innerHTML = 'O email deve ser preenchido corretamente!'
    //     element[0].classList.remove('entrada-invalida')
    // } else if (!password){
    //     element[0].innerHTML = 'A senha deve ser preenchida!'
    //     element[0].classList.remove('entrada-invalida')
    // } else if (!password2){
    //     element[0].innerHTML = 'A confirmação de senha deve ser preenchida!'
    //     element[0].classList.remove('entrada-invalida')
    // }
