var dataAtual
var vacina
var dataProxima
var comprovante
var dose

function novaVacina() {
    dataAtual = document.getElementById('dataAtual').value
    vacina = document.getElementById('vacina').value
    dataProxima = document.getElementById('dataProxima').value
    comprovante = 'https://raw.githubusercontent.com/luizasamorim/myHealth1.0/master/assets/comprovante.jpg' /*document.getElementById('comprovante').value*/
    dose = ''
    document.getElementsByName('dose').forEach(element => {
        if (element.checked) {
            dose = element.value
        }
    });

    if (!localStorage.getItem('vacinas')) {
        localStorage.setItem('vacinas', '[]')
    }

    if (validaCampos()) {
        vacinas = JSON.parse(localStorage.getItem('vacinas'))
        var id = vacinas.length
        
        var vacinaObj = {'id': id, 'dataAtual': dataAtual, 'vacina': vacina, 'dose': dose, 'comprovante': comprovante, 'dataProxima': dataProxima}

        vacinas.push(vacinaObj)

        localStorage.setItem('vacinas', JSON.stringify(vacinas))

        window.location = '../home/home.html'
    }else{
        erro.classList.remove('entrada-invalida') 
    }
}

function validaCampos() {
    if (!dataAtual || !vacina || !dataProxima || !comprovante || !dose) {
        erro.innerHTML = 'Nenhum campo pode ficar em branco!'
        return false
    } else return true
}