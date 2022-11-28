// importações
import { storage, db } from '../../config/firebase.js'
import { addDoc, collection, doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js"
import { uploadBytes, ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js";


// variaveis globais
var file = null;

//getters e setters
const getDataAtual = () => {
    return document.getElementById('dataAtual').value
} 

const getVacina = () => {
    return document.getElementById('vacina').value
} 

const getDose = () => {
    var dose = undefined
    document.getElementsByName('dose').forEach((element) => {
        if (element.checked) {
            dose = element.value
        }
    });
    return dose
}

const getDataProxima = () => {
    return document.getElementById('dataProxima').value
} 


// recuperar elementos
const erro = () => {
    return document.getElementById('erro')
}

const spinner = () => {
    return document.getElementById('spinner')
}

const btn = () => {
    return document.getElementById('btnCadastrarVacina')
}

const comprovante = () => {
    return document.getElementById('comprovante')
} 

const preview = () => {
    return document.getElementById('preview')
}

const home = () => {
    return document.getElementById('linkHome')
}

const logout = () => {
    return document.getElementById('linkLogout')
}

// funções
const novaVacina = (docUserId) => {
    const coll = '/usuarios/' + docUserId + '/vacinas'
    const fileRef = "comprovantes/" + gerarUid()

    erro().classList.add('entrada-invalida')
    btn().classList.add('entrada-invalida')
    spinner().classList.remove('entrada-invalida')

    if (validaCampos()) {
        uploadBytes(ref(storage, fileRef), file)
        .then((result) => {
            console.log("Arquivo enviado com sucesso: " + result)
            getDownloadURL(ref(storage, fileRef))
                .then((url) => {
                    console.log("URL: " + url)
                    addDoc(collection(db, coll), {
                        // id: document.id,
                        dataAtual: getDataAtual(),
                        vacina: getVacina(),
                        dose: getDose(),
                        comprovante: url,
                        dataProxima: getDataProxima(),
                        pathComprovante: fileRef
                    })
                    .then((document) => {
                        updateDoc(doc(db, coll, document.id), {
                            id: document.id
                        })
                        .then(() => {
                            console.log('ok');
                        })
                        .catch((error) => {
                            console.log("Erro ao atualizar o documento: " + error)
                        })
                        console.log('deu bom');
                        window.location.href = "../home/home.html?docUserId=" + location.search.split('=')[1]
                    })
                    .catch((error) => {
                        console.log(error)
                    })
                    .finally( () => {
                        spinner().classList.add('entrada-invalida')
                        btn().classList.remove('entrada-invalida')
                    })
                })
                .catch((error) => {
                    console.log("Erro ao recuperar URL de download: " + error)
                })
        })
        .catch((error) => {
            console.log("Erro ao enviar arquivo: " + error)
        })
        
    }else{
        setTimeout(() => {
            erro().classList.remove('entrada-invalida')
            spinner().classList.add('entrada-invalida')
            btn().classList.remove('entrada-invalida')
        }, 300);
    }
}

function validaCampos() {
    if (!getDataAtual() || !getVacina() || !getDataProxima() || !comprovante().value || !getDose()) {
        erro().innerHTML = 'Nenhum campo pode ficar em branco!'
        return false
    } else return true
}

const gerarUid = () => {
    const id = Date.now().toString(16) + Math.random().toString(16)
    return id.replace(/\./g, '')
}


// carregamento da pgn
window.onload = () => {
    btn().addEventListener('click', () => {novaVacina(location.search.split('=')[1])})
    comprovante().addEventListener('change', function (event) {
        file = event.target.files[0]
        preview().src = URL.createObjectURL(file)
    })
    home().addEventListener('click', () => {
        window.location.href = "../home/home.html?docUserId=" + location.search.split('=')[1]
    })
    logout().addEventListener('click', () => {
        window.location.href = "../index/index.html"
    })
}