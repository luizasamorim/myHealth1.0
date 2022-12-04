// importações
import { storage, db, auth } from '../../config/firebase.js'
import { deleteDoc, doc, updateDoc, query, onSnapshot } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js"
import { uploadBytes, ref, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js";


// variaveis globais
var file = null;
var pathComprovante = null;
const urlParams = new URLSearchParams(window.location.search)


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

const getComprovante = () => {
    return document.getElementById('comprovante').src
} 

const getPathComprovante = () => {
    return pathComprovante
}

const setId = (id) => {
    document.getElementById('id').innerHTML = id
} 

const setDataAtual = (dataAtual ) => {
    document.getElementById('dataAtual').value = dataAtual
} 

const setVacina = (vacina) => {
    document.getElementById('vacina').value = vacina
} 

const setComprovante = (url) => {
    document.getElementById('comprovante').src = url
} 

const setPathComprovante = (path) => {
    pathComprovante = path
}

const setDose = (dose) => {
    document.getElementsByName('dose').forEach((element) => {
        if (element.value == dose) {
            element.checked = true
        }
    });
}

const setDataProxima = (dataProxima) => {
    document.getElementById('dataProxima').value = dataProxima
} 


// recuperar elementos
const erro = () => {
    return document.getElementById('erro')
}

const spinner = () => {
    return document.getElementById('spinner')
}

const btnEditar = () => {
    return document.getElementById('btnEditarVacina')
}

const btnExcluir = () => {
    return document.getElementById('btnExcluirVacina')
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
const carregarVacina = (docUserId, docVacinaId) => {
    const coll = '/usuarios/' + docUserId + '/vacinas'

    const q = query(doc(db, coll, docVacinaId))

    onSnapshot(q, (documento) => {
        // setId(documento.id),
        setDataAtual(documento.data().dataAtual),
        setVacina(documento.data().vacina),
        setDose(documento.data().dose),
        setComprovante(documento.data().comprovante),
        setDataProxima(documento.data().dataProxima),
        setPathComprovante(documento.data().pathComprovante) 
        preview().src = documento.data().comprovante; 
    })
}

const editarVacina = (docUserId, docVacinaId) => {
    const coll = '/usuarios/' + docUserId + '/vacinas'

    erro().classList.add('entrada-invalida')
    btnEditar().classList.add('entrada-invalida')
    spinner().classList.remove('entrada-invalida')

    if (validaCampos()) {
        if (file) {
            uploadBytes(ref(storage, getPathComprovante()), file)
            .then((result) => {
                console.log("Arquivo enviado com sucesso: " + result)
                getDownloadURL(ref(storage, getPathComprovante()))
                    .then((url) => {
                        console.log("URL: " + url)
                        updateDoc(doc(db, coll, docVacinaId), {
                            // id: document.id,
                            dataAtual: getDataAtual(),
                            vacina: getVacina(),
                            dose: getDose(),
                            comprovante: url,
                            dataProxima: getDataProxima(),
                            pathComprovante: getPathComprovante()
                        })
                        .then((document) => {
                            console.log('deu bom');
                            window.location.href = "../home/home.html?docUserId=" + docUserId
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                        .finally( () => {
                            spinner().classList.add('entrada-invalida')
                            btnEditar().classList.remove('entrada-invalida')
                        })
                    })
                    .catch((error) => {
                        console.log("Erro ao recuperar URL de download: " + error)
                    })
            })
            .catch((error) => {
                console.log("Erro ao enviar arquivo: " + error)
            })
        } else { 

            updateDoc(doc(db, coll, docVacinaId), {
                dataAtual: getDataAtual(),
                vacina: getVacina(),
                dose: getDose(),
                comprovante: getComprovante(),
                dataProxima: getDataProxima(),
                pathComprovante: getPathComprovante()
            })
            .then((document) => {
                console.log('deu bom');
                window.location.href = "../home/home.html?docUserId=" + urlParams.get('docUserId')
            })
            .catch((error) => {
                console.log(error)
            })
            .finally( () => {
                spinner().classList.add('entrada-invalida')
                btnEditar().classList.remove('entrada-invalida')
            })
                    
        }
        
    }else{
        setTimeout(() => {
            erro().classList.remove('entrada-invalida')
            spinner().classList.add('entrada-invalida')
            btnEditar().classList.remove('entrada-invalida')
        }, 300);
    }
}

function excluirVacina(docUserId, docVacinaId) {
    console.log(getPathComprovante());
    const coll = '/usuarios/' + docUserId + '/vacinas'

    deleteObject(ref(storage, getPathComprovante()))
            .then(() => {
                console.log("Arquivo excluído com sucesso.")
                deleteDoc(doc(db, coll, docVacinaId))
                .then(() => {
                    console.log('doc foi');
                    window.location.href = "../home/home.html?docUserId=" + docUserId
                })
                .catch((error) => {
                    console.log("Erro ao excluir documento: " + error)
                })
            })
            .catch((error) => {
                console.log("Erro ao excluir o arquivo: " + error)
            })
}

function validaCampos() {
    if (!getDataAtual() || !getVacina() || !getDataProxima() /*|| !comprovante().value*/ || !getDose()) {
        erro().innerHTML = 'Nenhum campo pode ficar em branco!'
        return false
    } else return true
}

function efetuarLogout() {

    auth.signOut()
    .then(function() {
        console.log('Logout');
        window.location.href = "../index/index.html"
    }, function(error) {
        console.error( error );
    });    
}


// carregamento da pgn
window.onload = () => {
    // verifica se está logado
    auth.onAuthStateChanged(function(user) {
        if (user) {
            console.log('logado');
            console.log(auth.currentUser);
        } else {
            console.log('não logado');
            window.location.href = "../index/index.html"
        }
    })

    carregarVacina(urlParams.get('docUserId'), urlParams.get('docVacinaId'))

    btnEditar().addEventListener('click', () => {editarVacina(urlParams.get('docUserId'), urlParams.get('docVacinaId'))})
    btnExcluir().addEventListener('click', () => {excluirVacina(urlParams.get('docUserId'), urlParams.get('docVacinaId'))})


    comprovante().addEventListener('change', function (event) {
        file = event.target.files[0]
        preview().src = URL.createObjectURL(file)
    })
    home().addEventListener('click', () => {
        window.location.href = "../home/home.html?docUserId=" + urlParams.get('docUserId')
    })
    logout().addEventListener('click', () => {efetuarLogout()})
}