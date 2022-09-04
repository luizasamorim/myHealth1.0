function criarConta() {
    var nome = document.getElementById('nome').value
    var nascimento = document.getElementById('nascimento').value
    var email = document.getElementById('email').value
    var password = document.getElementById('password').value
    var sexo = ''
    document.getElementsByName('sexo').forEach(element => {
        if (element.checked) {
            sexo = element.value
        }
    });

    if (!localStorage.getItem('usuarios')) {
        localStorage.setItem('usuarios', '[]')
    }

    debugger
    
    usuarios = JSON.parse(localStorage.getItem('usuarios'))
    
    var usuario = {'nome': nome, 'sexo': sexo, 'nascimento': nascimento, 'email': email, 'password': password}

    usuarios.push(usuario)

    localStorage.setItem('usuarios', JSON.stringify(usuarios))

}

    // nome
    // masculino
    // feminino
    // nascimento
    // email
    // password