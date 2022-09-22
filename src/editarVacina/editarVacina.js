// const id = function () {
//     return location.search.split('=')[1]
// }

window.onload = function () {
    carregaDados(location.search.split('=')[1])
}

function carregaDados(id) {
    var vacina = JSON.parse(localStorage.getItem('vacinas'))

    document.getElementById('dataAtual').value = vacina[id].dataAtual
    document.getElementById('vacina').value = vacina[id].vacina
    // document.getElementById('comprovante').value = vacina[id].comprovante
    document.getElementById('dataProxima').value = vacina[id].dataProxima
    
    document.getElementsByName('dose').forEach(element => {
        if (element.value == vacina[id].dose) {
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

    var dataAtual = document.getElementById('dataAtual').value
    var vacina = document.getElementById('vacina').value
    var dataProxima = document.getElementById('dataProxima').value
    // var comprovante = document.getElementById('comprovante').value
    var dose = ''
    document.getElementsByName('dose').forEach(element => {
        if (element.checked) {
            dose = element.value
        }
    });
    
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
}

/*
function preview(){
    alert('call')
    var imagem = document.getElementById('comprovante').files
    var preview = document.getElementById('preview')
    
    var reader = new FileReader();
    
    reader.onloadend = function () {
        preview.src = reader.result;
    }
    
    if(imagem){
        alert('aaaa')
        reader.readAsDataURL(imagem);
    }else{
        alert('bbbbb')
        preview.src = "";
    }
}
*/
/*
[{"id":0,"dataAtual":"2022-06-29","vacina":"a","dose":"dose1","comprovante":{},"dataProxima":"2022-09-15"},{"id":1,"dataAtual":"2022-06-29","vacina":"b","dose":"dose1","comprovante":{},"dataProxima":"2022-09-15"},{"id":2,"dataAtual":"2022-06-29","vacina":"c","dose":"dose1","comprovante":{},"dataProxima":"2022-09-15"},{"id":3,"dataAtual":"2022-06-29","vacina":"d","dose":"dose1","comprovante":{},"dataProxima":"2022-09-15"},{"id":4,"dataAtual":"2022-06-29","vacina":"e","dose":"dose1","comprovante":{},"dataProxima":"2022-09-15"}]
*/