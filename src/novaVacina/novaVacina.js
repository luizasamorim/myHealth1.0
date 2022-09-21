function novaVacina() {
    var dataAtual = document.getElementById('dataAtual').value
    var vacina = document.getElementById('vacina').value
    var dataProxima = document.getElementById('dataProxima').value
    var comprovante = '' /*document.getElementById('comprovante').value*/
    var dose = ''
    document.getElementsByName('dose').forEach(element => {
        if (element.checked) {
            dose = element.value
        }
    });

    if (!localStorage.getItem('vacinas')) {
        localStorage.setItem('vacinas', '[]')
    }

    vacinas = JSON.parse(localStorage.getItem('vacinas'))
    var id = vacinas.length
    
    var vacina = {'id': id, 'dataAtual': dataAtual, 'vacina': vacina, 'dose': dose, 'comprovante': comprovante, 'dataProxima': dataProxima}

    vacinas.push(vacina)

    localStorage.setItem('vacinas', JSON.stringify(vacinas))

    window.location = '../home/home.html'
}