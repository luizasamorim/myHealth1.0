function entrar() {
    var email = document.getElementById('email').value
    var password = document.getElementById('password').value
    var counter1 = 0;
    counter2 = 0;

    usuarios = JSON.parse(localStorage.getItem('usuarios'))
    debugger
    usuarios.forEach((element) => {
        if (element.email == email && element.password == password) {
            window.location = '../home/home.html'
        }
    });

    var element = document.getElementsByClassName('entrada-invalida')
    element[0].classList.remove('entrada-invalida')   
}