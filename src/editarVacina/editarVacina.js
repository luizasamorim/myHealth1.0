var dataAtual
var vacina
var dataProxima
var comprovante
var dose

window.onload = function () {
    carregaDados(location.search.split('=')[1])
}

function carregaDados(id) {
    var vacinas = JSON.parse(localStorage.getItem('vacinas'))

    document.getElementById('dataAtual').value = vacinas[id].dataAtual
    document.getElementById('vacina').value = vacinas[id].vacina
    // document.getElementById('comprovante').value = vacinas[id].comprovante
    document.getElementById('dataProxima').value = vacinas[id].dataProxima
    
    document.getElementsByName('dose').forEach(element => {
        if (element.value == vacinas[id].dose) {
            element.checked = true
        }
    });
}

function excluirVacina() {
    var id = location.search.split('=')[1]
    vacinas = JSON.parse(localStorage.getItem('vacinas'))
    var index;
    vacinas.forEach(element => {
        if (element.id == id) {
            index = vacinas.indexOf(element)
        }
    });
    
    vacinas.splice(index,1)

    localStorage.setItem('vacinas', JSON.stringify(vacinas))

    window.location = '../home/home.html' 
}

function editarVacina() {
    var id = location.search.split('=')[1]

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
    
    if (validaCampos()) {
        vacinas = JSON.parse(localStorage.getItem('vacinas'))

        var index;
        vacinas.forEach(element => {
            if (element.id == id) {
                index = vacinas.indexOf(element)
            }
        });
        
        vacinas.splice(index,1)
        
        var vacinaEditada = {'id': parseInt(id), 'dataAtual': dataAtual, 'vacina': vacina, 'dose': dose, 'comprovante': comprovante, 'dataProxima': dataProxima}
        
        vacinas.push(vacinaEditada)

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


/*
[{"id":0,"dataAtual":"2022-06-01","vacina":"hepatite","dose":"1a. dose","comprovante":"https://raw.githubusercontent.com/luizasamorim/myHealth1.0/master/assets/comprovante.jpg","dataProxima":"2022-09-15"},
{"id":1,"dataAtual":"2022-06-29","vacina":"febre amarela","dose":"3a. dose","comprovante":"https://raw.githubusercontent.com/luizasamorim/myHealth1.0/master/assets/comprovante.jpg","dataProxima":"2022-09-15"},
{"id":2,"dataAtual":"2022-06-29","vacina":"polio","dose":"2a. dose","comprovante":"https://raw.githubusercontent.com/luizasamorim/myHealth1.0/master/assets/comprovante.jpg","dataProxima":"2022-09-15"},
{"id":3,"dataAtual":"2022-06-29","vacina":"gripe a","dose":"1a. dose","comprovante":"https://raw.githubusercontent.com/luizasamorim/myHealth1.0/master/assets/comprovante.jpg","dataProxima":"2022-09-15"},
{"id":4,"dataAtual":"2022-06-29","vacina":"gripe b","dose":"Reforço","comprovante":"https://raw.githubusercontent.com/luizasamorim/myHealth1.0/master/assets/comprovante.jpg","dataProxima":"2022-09-15"}]
*/
