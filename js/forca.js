let jogarNovamente = true;
let tentativas = 6;
let listaDinamica = [];
let palavraSecretaCategoria;
let palavraSecretaSorteada;
let palavras = [];
let jogoAutomatico = true;

carregaListaAutomatica();

criarPalavraSecreta();
function criarPalavraSecreta() {
    const indexPalavra = parseInt(Math.random() * palavras.length)

    palavraSecretaSorteada = palavras[indexPalavra].nome;
    palavraSecretaCategoria = palavras[indexPalavra].categoria;

    // console.log(palavraSecretaSorteada);
}

montarPalavraNaTela();
function montarPalavraNaTela() {
    const categoria = document.getElementById("categoria");
    categoria.innerHTML = palavraSecretaCategoria;

    const palavraTela = document.getElementById("palavra-secreta");
    palavraTela.innerHTML = "";

    for (i = 0; i < palavraSecretaSorteada.length; i++) {
        if (listaDinamica[i] == undefined) {
            if (palavraSecretaSorteada[i] == " ") {
                listaDinamica[i] = " ";
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letrasEspaco'>" + listaDinamica[i] + "</div>"
            }
            else {
                listaDinamica[i] = "&nbsp;"
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letras'>" + listaDinamica[i] + "</div>"
            }
        }
        else {
            if (palavraSecretaSorteada[i] == " ") {
                listaDinamica[i] = " ";
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letrasEspaco'>" + listaDinamica[i] + "</div>"
            }
            else {
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letras'>" + listaDinamica[i] + "</div>"
            }
        }
    }
}

function verificaLetraEscolhida(letra) {
    document.getElementById("tecla-" + letra).disabled = true;
    if (tentativas > 0) {
        mudarStyleLetra("tecla-" + letra, false);
        comparalistas(letra);
        montarPalavraNaTela();
    }
}

function mudarStyleLetra(tecla, condicao) {
    if (condicao == false) {
        document.getElementById(tecla).style.background = "#D90000";
        document.getElementById(tecla).style.color = "#ffffff";
        document.getElementById(tecla).style.borderColor = "#fff"
    }
    else {
        document.getElementById(tecla).style.background = "#05F100";
        document.getElementById(tecla).style.color = "#000";
        document.getElementById(tecla).style.borderColor = "#000";
    }


}

function comparalistas(letra) {
    const pos = palavraSecretaSorteada.indexOf(letra)
    function getRandomMessageFail() {
        const messages = [
            "Até minha vó acertaria... ",
            "Como pode ser tão... ",
            "Chore não viu... ",
            "Calma beldade... ",
            "Como dizia meu pai, um burro de cada vez, 2 não dá!... ",
            "Algum dia você acerta haha... ",
            "Me dá nota, por favor!... ",
            "Será que ele(a) pensa?... ",
            "Estrume mesmo... ",
            "Calabreso é um jegue!... "
        ];
        const randomIndex = Math.floor(Math.random() * messages.length);
        return messages[randomIndex];
    }
    if (pos < 0) {
        tentativas--
        carregaImagemForca();

        let messageRandomFail = getRandomMessageFail()

        if (tentativas == 0) {
            abreModal("Vixiii!", `${messageRandomFail} A palavra secreta era <br>` + palavraSecretaSorteada);
            piscarBotaoJogarNovamente(true);
        }
    }
    else {
        mudarStyleLetra("tecla-" + letra, true);
        for (i = 0; i < palavraSecretaSorteada.length; i++) {
            if (palavraSecretaSorteada[i] == letra) {
                listaDinamica[i] = letra;
            }
        }
    }

    let vitoria = true;
    for (i = 0; i < palavraSecretaSorteada.length; i++) {
        if (palavraSecretaSorteada[i] != listaDinamica[i]) {
            vitoria = false;
        }
    }
    function getRandomMessage() {
        const messages = [
            "Orgulho do papai",
            "Você conseguiu!",
            "Excelente trabalho!",
            "Parabéns, campeão!",
            "Impressionante!",
            "Fantástico!",
            "Você é incrível!",
            "Muito bem!",
            "Você é demais!",
            "Mandou bem!"
        ];
        const randomIndex = Math.floor(Math.random() * messages.length);
        return messages[randomIndex];
    }

    if (vitoria == true) {
        const randomMessage = getRandomMessage();
        abreModal("PARABÉNS!", randomMessage);
        tentativas = 0;
        piscarBotaoJogarNovamente(true);
    }
}

// async function piscarBotaoJogarNovamente(){
//     while (jogarNovamente == true) {
//         document.getElementById("btnReiniciar").style.backgroundColor = 'red';
//         document.getElementById("btnReiniciar").style.scale = 1.3;
//         await atraso(500)
//         document.getElementById("btnReiniciar").style.backgroundColor = 'yellow';
//         document.getElementById("btnReiniciar").style.scale = 1;
//         await atraso(500)
//     }
// }

async function atraso(tempo) {
    return new Promise(x => setTimeout(x, tempo))
}

function carregaImagemForca() {
    switch (tentativas) {
        case 5:
            document.getElementById("imagem").style.backgroundImage = "url('./img/forca01.png')";
            break;
        case 4:
            document.getElementById("imagem").style.backgroundImage = "url('./img/forca02.png')";
            break;
        case 3:
            document.getElementById("imagem").style.backgroundImage = "url('./img/forca03.png')";
            break;
        case 2:
            document.getElementById("imagem").style.backgroundImage = "url('./img/forca04.png')";
            break;
        case 1:
            document.getElementById("imagem").style.backgroundImage = "url('./img/forca05.png')";
            break;
        case 0:
            document.getElementById("imagem").style.backgroundImage = "url('./img/forca06.png')";
            break;
        default:
            document.getElementById("imagem").style.backgroundImage = "url('./img/forca.png')";
            break;
    }
}

function abreModal(titulo, mensagem) {
    let modalTitulo = document.getElementById("exampleModalLabel");
    modalTitulo.innerText = titulo;

    let modalBody = document.getElementById("modalBody");
    modalBody.innerHTML = mensagem;

    $("#myModal").modal({
        show: true
    });
}

let bntReiniciar = document.querySelector("#btnReiniciar")
bntReiniciar.addEventListener("click", function () {
    jogarNovamente = false;
    location.reload();
});

function listaAutomatica() { // ativa o modo manual
    if (jogoAutomatico == true) {
        document.getElementById("jogarAutomatico").innerHTML = "<i class='bx bx-play-circle'></i>"
        palavras = [];
        jogoAutomatico = false;

        document.getElementById("abreModalAddPalavra").style.display = "block";
        document.getElementById("status").innerHTML = "Modo Manual";
    }
    else if (jogoAutomatico == false) { // ativa o modo automático
        document.getElementById("jogarAutomatico").innerHTML = "<i class='bx bx-pause-circle'></i>"
        jogoAutomatico = true;

        document.getElementById("abreModalAddPalavra").style.display = "none";
        document.getElementById("status").innerHTML = "Modo Automático";

    }
}

const modal = document.getElementById("modal-alerta");

const btnAbreModal = document.getElementById("abreModalAddPalavra");
btnAbreModal.onclick = function () {
    modal.style.display = "block";
}

const btnFechaModal = document.getElementById("fechaModal");
btnFechaModal.onclick = function () {
    modal.style.display = "none";
    document.getElementById("addPalavra").value = "";
    document.getElementById("addCategoria").value = "";
}

window.onclick = function () {
    if (event.target == modal) {
        modal.style.display = "none";
        document.getElementById("addPalavra").value = "";
        document.getElementById("addCategoria").value = "";
    }
}

function carregaListaAutomatica() {
    // "Array" que armazena as palavras e sua categorias 💎
    palavras = [
        palavra001 = {
            nome: "EXERCICIO",
            categoria: "SAÚDE E BEM-ESTAR"
        },
        palavra002 = {
            nome: "NUTRICAO",
            categoria: "SAÚDE E BEM-ESTAR"
        },
        palavra003 = {
            nome: "MEDITACAO",
            categoria: "SAÚDE E BEM-ESTAR"
        },
        palavra004 = {
            nome: "SONO",
            categoria: "SAÚDE E BEM-ESTAR"
        },
        palavra005 = {
            nome: "HIDRATACAO",
            categoria: "SAÚDE E BEM-ESTAR"
        },
        palavra006 = {
            nome: "FITNESS",
            categoria: "SAÚDE E BEM-ESTAR"
        },
        palavra007 = {
            nome: "VITAMINAS",
            categoria: "SAÚDE E BEM-ESTAR"
        },
        palavra008 = {
            nome: "YOGA",
            categoria: "SAÚDE E BEM-ESTAR"
        },
        palavra009 = {
            nome: "FISIOTERAPIA",
            categoria: "SAÚDE E BEM-ESTAR"
        },
        palavra010 = {
            nome: "MASSAGEM",
            categoria: "SAÚDE E BEM-ESTAR"
        },
        palavra011 = {
            nome: "PILATES",
            categoria: "SAÚDE E BEM-ESTAR"
        },
        palavra012 = {
            nome: "DIETA",
            categoria: "SAÚDE E BEM-ESTAR"
        },
        palavra013 = {
            nome: "HIGIENE",
            categoria: "SAÚDE E BEM-ESTAR"
        },
        palavra014 = {
            nome: "TERAPIA",
            categoria: "SAÚDE E BEM-ESTAR"
        },
        palavra015 = {
            nome: "CARDIO",
            categoria: "SAÚDE E BEM-ESTAR"
        },
        palavra016 = {
            nome: "MUSCULACAO",
            categoria: "SAÚDE E BEM-ESTAR"
        },
        palavra017 = {
            nome: "RELAXAMENTO",
            categoria: "SAÚDE E BEM-ESTAR"
        },
        palavra018 = {
            nome: "MEDITACAO",
            categoria: "SAÚDE E BEM-ESTAR"
        },
        palavra019 = {
            nome: "ESTRESSE",
            categoria: "SAÚDE E BEM-ESTAR"
        },
        palavra020 = {
            nome: "ANSIEDADE",
            categoria: "SAÚDE E BEM-ESTAR"
        },
        palavra021 = {
            nome: "DETOX",
            categoria: "SAÚDE E BEM-ESTAR"
        },
        palavra022 = {
            nome: "IMUNIDADE",
            categoria: "SAÚDE E BEM-ESTAR"
        },
        palavra023 = {
            nome: "ALONGAMENTO",
            categoria: "SAÚDE E BEM-ESTAR"
        },
        palavra024 = {
            nome: "CUIDADOS COM A PELE",
            categoria: "SAÚDE E BEM-ESTAR"
        },
        palavra025 = {
            nome: "BEM-ESTAR MENTAL",
            categoria: "SAÚDE E BEM-ESTAR"
        },
        palavra026 = {
            nome: "MINDFULNESS",
            categoria: "SAÚDE E BEM-ESTAR"
        },
        palavra027 = {
            nome: "AUTOESTIMA",
            categoria: "SAÚDE E BEM-ESTAR"
        },
        palavra028 = {
            nome: "HABITOS SAUDAVEIS",
            categoria: "SAÚDE E BEM-ESTAR"
        },
        palavra029 = {
            nome: "PREVENCAO",
            categoria: "SAÚDE E BEM-ESTAR"
        },
        palavra030 = {
            nome: "BALANCEAMENTO",
            categoria: "SAÚDE E BEM-ESTAR"
        },
        palavra031 = {
            nome: "BEM-ESTAR SOCIAL",
            categoria: "SAÚDE E BEM-ESTAR"
        },
        palavra032 = {
            nome: "ATIVIDADE FISICA",
            categoria: "SAÚDE E BEM-ESTAR"
        },
        palavra033 = {
            nome: "CONSULTA MEDICA",
            categoria: "SAÚDE E BEM-ESTAR"
        },
        palavra034 = {
            nome: "EXAMES REGULARES",
            categoria: "SAÚDE E BEM-ESTAR"
        },
        palavra035 = {
            nome: "SAUDE OCULAR",
            categoria: "SAÚDE E BEM-ESTAR"
        },
        palavra036 = {
            nome: "VACINACAO",
            categoria: "SAÚDE E BEM-ESTAR"
        },
        palavra037 = {
            nome: "SAUDE DENTAL",
            categoria: "SAÚDE E BEM-ESTAR"
        },
        palavra038 = {
            nome: "POSTURA",
            categoria: "SAÚDE E BEM-ESTAR"
        },
        palavra039 = {
            nome: "ACUPUNTURA",
            categoria: "SAÚDE E BEM-ESTAR"
        },
        palavra040 = {
            nome: "HARMONIA",
            categoria: "SAÚDE E BEM-ESTAR"
        },
        palavra041 = {
            nome: "AROMATERAPIA",
            categoria: "SAÚDE E BEM-ESTAR"
        },
        palavra042 = {
            nome: "FITOTERAPIA",
            categoria: "SAÚDE E BEM-ESTAR"
        },
        palavra043 = {
            nome: "SAUNA",
            categoria: "SAÚDE E BEM-ESTAR"
        },
        palavra044 = {
            nome: "BANHO DE ERVAS",
            categoria: "SAÚDE E BEM-ESTAR"
        },
        palavra045 = {
            nome: "TERAPIA HOLISTICA",
            categoria: "SAÚDE E BEM-ESTAR"
        },
        palavra046 = {
            nome: "CROMOTERAPIA",
            categoria: "SAÚDE E BEM-ESTAR"
        },
        palavra047 = {
            nome: "MEDITACAO GUIADA",
            categoria: "SAÚDE E BEM-ESTAR"
        },
        palavra048 = {
            nome: "AUTOCUIDADO",
            categoria: "SAÚDE E BEM-ESTAR"
        },
        palavra049 = {
            nome: "REIKI",
            categoria: "SAÚDE E BEM-ESTAR"
        },
        palavra050 = {
            nome: "RESPIRACAO",
            categoria: "SAÚDE E BEM-ESTAR"
        }
    ];
}

function adicionarPalavra() {
    let addPalavra = document.getElementById("addPalavra").value.toUpperCase();
    let addCategoria = document.getElementById("addCategoria").value.toUpperCase();

    if (isNullOrWhiteSpace(addPalavra) || isNullOrWhiteSpace(addCategoria) || addPalavra.length < 3 || addCategoria.length < 3) {
        abreModal("ATENÇÃO", " Palavra e/ou Categoria inválidos");
        return;
    }

    let palavra = {
        nome: addPalavra,
        categoria: addCategoria
    }

    palavras.push(palavra);
    sortear();

    document.getElementById("addPalavra").value = "";
    document.getElementById("addCategoria").value = "";
}

function isNullOrWhiteSpace(input) {
    return !input || !input.trim();
}

function sortear() {
    if (jogoAutomatico == true) {
        location.reload();
    }
    else {
        if (palavras.length > 0) {
            listaDinamica = [];
            criarPalavraSecreta();
            montarPalavraNaTela();
            resetaTeclas();
            tentativas = 6;
            piscarBotaoJogarNovamente(false);
        }
    }
}

// Reseta as teclas 🥉

function resetaTeclas() {
    let teclas = document.querySelectorAll(".teclas > button")
    teclas.forEach((x) => {
        x.style.background = "#000";
        x.style.color = "#ffff00";
        x.style.borderColor = "#fff"
        x.disabled = false;
    });
}

function verificaTeclaEscolhida(tecla) {
    console.log("Tecla escolhida:", tecla);
}

const teclas = document.querySelectorAll('.teclas button');

for (let i = 0; i < teclas.length; i++) {
    // Este for está percorrendo todas as teclas dentro da div teclas 👓
    teclas[i].addEventListener('click', function() {
        verificaTeclaEscolhida(teclas[i].textContent);
    });
}

document.addEventListener('keydown', function (event) {
    const teclasValidas = ['W', 'S', 'A', 'D', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
        'F', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B', 'N', 'M'];
    const teclaPressionada = event.key.toUpperCase();
    if (teclasValidas.includes(teclaPressionada)) {
        // Está simulando o click do botão que está no HTML 😲
        const botao = document.querySelector(`#tecla-${teclaPressionada}`);
        if (botao) {
            botao.click();
        }
    }
});

async function piscarBotaoJogarNovamente(querJogar) {
    if (querJogar) {
        document.getElementById("jogarNovamente").style.display = "block";
    }
    else {
        document.getElementById("jogarNovamente").style.display = "none";
    }
}