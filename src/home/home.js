window.onload = function () {
    listaVacinas()
}

function novaVacina() {
    window.location = '../novaVacina/novaVacina.html'
}

function editarVacina(index) {
    window.location = '../editarVacina/editarVacina.html?id='+index    
}

function listaVacinas() {

    var vacinas = JSON.parse(localStorage.getItem("vacinas"))
    var lista = document.getElementById("vacinas")
    var i = 0;
    
    vacinas.forEach(function () {
        var index = vacinas[i].id

        var card = document.createElement("div")
        card.classList.add("card", "col-xl-3", "col-lg-4", "col-md-6", "mb-4")
        card.onclick = function(){
            editarVacina(index)
        }

            var id = document.createElement("div")
            id.classList.add("d-lg-none")
            id.setAttribute('id', index)

            var cardBody = document.createElement("div")
            cardBody.classList.add("card-body", "align-content-center", "pb-0", "pt-1")

                var cardTitle = document.createElement("div")
                cardTitle.classList.add("card-title", "text-primary", "text-center", "mb-0")

                    var vacina = document.createElement("div")
                    vacina.innerHTML = vacinas[i].vacina

                var centro = document.createElement("div")
                centro.classList.add("text-center")

                    var dose = document.createElement("span")
                    dose.classList.add("card-text", "text-light", "bg-primary", "ps-1", "pe-1")
                    dose.innerHTML = vacinas[i].dose
                
                var dataAtual = document.createElement("div")
                dataAtual.classList.add("card-text", "text-center", "text-muted")
                dataAtual.innerHTML = dateParsing(vacinas[i].dataAtual)
                
                var comprovante = document.createElement("img")
                comprovante.classList.add("card-img", "mt-2", "mb-3", "img")
                comprovante.src = vacinas[i].comprovante

                var dataProxima = document.createElement("div")
                dataProxima.classList.add("card-text", "d-flex", "justify-content-end", "text-danger")
                dataProxima.innerHTML = dateParsing(vacinas[i].dataProxima)

        lista.appendChild(card)
            card.appendChild(id)
            card.appendChild(cardBody)
            cardBody.appendChild(cardTitle)
                cardTitle.appendChild(vacina)
            cardBody.appendChild(centro)
                centro.appendChild(dose)
            cardBody.appendChild(dataAtual)
            cardBody.appendChild(comprovante)
            cardBody.appendChild(dataProxima)       
    
        i++;
    });
}

function dateParsing(date) {
    var parsed = date.split('-')
    return parsed[2] + '/' + parsed[1] + '/' + parsed[0]
}