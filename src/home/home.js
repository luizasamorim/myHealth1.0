// importações
import {db} from '../../config/firebase.js'
import {query, collection, onSnapshot, where} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js"


// getters e setters
const listaVacinas = []


// recupera elementos html
const spinner = () => {
    return document.getElementById('spinner')
}

const btn = () => {
    return document.getElementById('btnNovaVacina')
}


// funções
const carregarVacinas = (userId) => {
    const coll = '/usuarios/' + userId + '/vacinas'
    const q = query( collection(db, coll))

    onSnapshot(q, (results) => {
        results.forEach((documento) => {
            listaVacinas.push({
                id: documento.id,
                dataAtual: documento.data().dataAtual,
                vacina: documento.data().vacina,
                dose: documento.data().dose,
                comprovante: documento.data().comprovante,
                dataProxima: documento.data().dataProxima
            })
        })
        listarVacinas(listaVacinas)       
    })
}

function novaVacina() {
    window.location = '../novaVacina/novaVacina.html?docUserId=' + location.search.split('=')[1]
}

function editarVacina(index) {
    window.location = '../editarVacina/editarVacina.html?docUserId='+location.search.split('=')[1]+'&docVacinaId='+index
}

function listarVacinas(listaVacinas) {
    
    var lista = document.getElementById("vacinas")
    lista.innerHTML = null;
    var i = 0;
    
    listaVacinas.forEach(function () {
        
        var index = listaVacinas[i].id

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
                    vacina.innerHTML = listaVacinas[i].vacina

                var centro = document.createElement("div")
                centro.classList.add("text-center")

                    var dose = document.createElement("span")
                    dose.classList.add("card-text", "text-light", "bg-primary", "ps-1", "pe-1")
                    dose.innerHTML = listaVacinas[i].dose
                
                var dataAtual = document.createElement("div")
                dataAtual.classList.add("card-text", "text-center", "text-muted")
                dataAtual.innerHTML = listaVacinas[i].dataAtual
                
                var comprovante = document.createElement("img")
                comprovante.classList.add("card-img", "mt-2", "mb-3", "img")
                comprovante.src = listaVacinas[i].comprovante

                var dataProxima = document.createElement("div")
                dataProxima.classList.add("card-text", "d-flex", "justify-content-end", "text-danger")
                dataProxima.innerHTML = listaVacinas[i].dataProxima

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

function search() {
    let input = document.getElementById('search-bar').value
    input = input.toLowerCase();
    let x = document.getElementsByClassName('card');
      
    for (i = 0; i < x.length; i++) { 
        if (!x[i].innerHTML.toLowerCase().includes(input)) {
            x[i].style.display="none";
        }
        else {
            x[i].style.display="list-item";
            x[i].style.listStyleType="none";       
        }
    }
}

// carregamento da pgn
window.onload = () => {
    btn().addEventListener('click', () => {novaVacina()})

    carregarVacinas(location.search.split('=')[1])

    document.getElementById("search-bar").addEventListener('keyup', () => {
        const searchString = document.getElementById("search-bar").value.trim()
        listarVacinas(listaVacinas.filter(element => element.vacina.includes(searchString)))
    })
}