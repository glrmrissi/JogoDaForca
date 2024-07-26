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
    palavraSecretaSignificado = palavras[indexPalavra].significado;

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
            abreModal("Vixiii!", `${messageRandomFail} A palavra secreta era <br> ${palavraSecretaSorteada} e o significado era <br> ${palavraSecretaSignificado}`);
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
        abreModal(`Parabéns ${randomMessage} e o significado era <br> ${palavraSecretaSignificado}`);
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
            categoria: "SAÚDE E BEM-ESTAR",
            significado: "Atividade física realizada para manter ou melhorar a saúde e a forma física."
        },
        palavra002 = {
            nome: "NUTRICAO",
            categoria: "SAÚDE E BEM-ESTAR",
            significado: "A ciência que estuda os alimentos e sua relação com a saúde."
        },
        palavra003 = {
            nome: "MEDITACAO",
            categoria: "SAÚDE E BEM-ESTAR",
            significado: "Prática que envolve técnicas de concentração e relaxamento para alcançar um estado de tranquilidade e clareza mental."
        },
        palavra004 = {
            nome: "SONO",
            categoria: "SAÚDE E BEM-ESTAR",
            significado: "Estado natural de descanso do corpo e da mente."
        },
        palavra005 = {
            nome: "HIDRATACAO",
            categoria: "SAÚDE E BEM-ESTAR",
            significado: "Processo de manter o corpo abastecido com água."
        },
        palavra006 = {
            nome: "FITNESS",
            categoria: "SAÚDE E BEM-ESTAR",
            significado: "Condição de estar fisicamente saudável e em boa forma."
        },
        palavra007 = {
            nome: "VITAMINAS",
            categoria: "SAÚDE E BEM-ESTAR",
            significado: "Nutrientes essenciais que o corpo necessita para funcionar corretamente."
        },
        palavra008 = {
            nome: "YOGA",
            categoria: "SAÚDE E BEM-ESTAR",
            significado: "Prática física, mental e espiritual originária da Índia."
        },
        palavra009 = {
            nome: "FISIOTERAPIA",
            categoria: "SAÚDE E BEM-ESTAR",
            significado: "Tratamento para restaurar o movimento e a função física."
        },
        palavra010 = {
            nome: "MASSAGEM",
            categoria: "SAÚDE E BEM-ESTAR",
            significado: "Manipulação dos tecidos moles do corpo para relaxamento ou reabilitação."
        },
        palavra011 = {
            nome: "PILATES",
            categoria: "SAÚDE E BEM-ESTAR",
            significado: "Método de exercício que se concentra no fortalecimento do corpo com ênfase nos músculos do core."
        },
        palavra012 = {
            nome: "DIETA",
            categoria: "SAÚDE E BEM-ESTAR",
            significado: "Regime alimentar seguido para alcançar determinados objetivos de saúde."
        },
        palavra013 = {
            nome: "HIGIENE",
            categoria: "SAÚDE E BEM-ESTAR",
            significado: "Práticas de limpeza e cuidado corporal para manter a saúde."
        },
        palavra014 = {
            nome: "TERAPIA",
            categoria: "SAÚDE E BEM-ESTAR",
            significado: "Tratamento de condições físicas ou mentais por meio de técnicas específicas."
        },
        palavra015 = {
            nome: "CARDIO",
            categoria: "SAÚDE E BEM-ESTAR",
            significado: "Exercícios que aumentam a frequência cardíaca para melhorar a saúde cardiovascular."
        },
        palavra016 = {
            nome: "MUSCULACAO",
            categoria: "SAÚDE E BEM-ESTAR",
            significado: "Treinamento com pesos para aumentar a força e a massa muscular."
        },
        palavra017 = {
            nome: "RELAXAMENTO",
            categoria: "SAÚDE E BEM-ESTAR",
            significado: "Processo de aliviar a tensão e reduzir o estresse."
        },
        palavra018 = {
            nome: "MEDITACAO",
            categoria: "SAÚDE E BEM-ESTAR",
            significado: "Prática que envolve técnicas de concentração e relaxamento para alcançar um estado de tranquilidade e clareza mental."
        },
        palavra019 = {
            nome: "ESTRESSE",
            categoria: "SAÚDE E BEM-ESTAR",
            significado: "Resposta do corpo a demandas ou ameaças, tanto físicas quanto emocionais."
        },
        palavra020 = {
            nome: "ANSIEDADE",
            categoria: "SAÚDE E BEM-ESTAR",
            significado: "Sentimento de preocupação, nervosismo ou mal-estar sobre algo com um resultado incerto."
        },
        palavra021 = {
            nome: "DETOX",
            categoria: "SAÚDE E BEM-ESTAR",
            significado: "Processo de eliminação de toxinas do corpo."
        },
        palavra022 = {
            nome: "IMUNIDADE",
            categoria: "SAÚDE E BEM-ESTAR",
            significado: "Capacidade do corpo de resistir a infecções e doenças."
        },
        palavra023 = {
            nome: "ALONGAMENTO",
            categoria: "SAÚDE E BEM-ESTAR",
            significado: "Exercícios que visam aumentar a flexibilidade dos músculos e articulações."
        },
        palavra024 = {
            nome: "CUIDADOS COM A PELE",
            categoria: "SAÚDE E BEM-ESTAR",
            significado: "Práticas e produtos utilizados para manter a pele saudável e bonita."
        },
        palavra025 = {
            nome: "BEM-ESTAR MENTAL",
            categoria: "SAÚDE E BEM-ESTAR",
            significado: "Estado de saúde mental em que uma pessoa é capaz de lidar com as tensões normais da vida."
        },
        palavra026 = {
            nome: "MINDFULNESS",
            categoria: "SAÚDE E BEM-ESTAR",
            significado: "Prática de manter a atenção plena no momento presente."
        },
        palavra027 = {
            nome: "AUTOESTIMA",
            categoria: "SAÚDE E BEM-ESTAR",
            significado: "Avaliação subjetiva que uma pessoa faz de si mesma."
        },
        palavra028 = {
            nome: "HABITOS SAUDAVEIS",
            categoria: "SAÚDE E BEM-ESTAR",
            significado: "Rotinas que contribuem para uma vida saudável."
        },
        palavra029 = {
            nome: "PREVENCAO",
            categoria: "SAÚDE E BEM-ESTAR",
            significado: "Ações tomadas para evitar doenças ou problemas de saúde."
        },
        palavra030 = {
            nome: "BALANCEAMENTO",
            categoria: "SAÚDE E BEM-ESTAR",
            significado: "Ato de manter o equilíbrio em diversos aspectos da vida."
        },
        palavra031 = {
            nome: "BEM-ESTAR SOCIAL",
            categoria: "SAÚDE E BEM-ESTAR",
            significado: "Estado de saúde social em que uma pessoa tem boas relações e uma rede de suporte."
        },
        palavra032 = {
            nome: "ATIVIDADE FISICA",
            categoria: "SAÚDE E BEM-ESTAR",
            significado: "Qualquer movimento corporal produzido pelos músculos esqueléticos que requer gasto de energia."
        },
        palavra033 = {
            nome: "CONSULTA MEDICA",
            categoria: "SAÚDE E BEM-ESTAR",
            significado: "Encontro com um profissional de saúde para avaliação e orientação médica."
        },
        palavra034 = {
            nome: "EXAMES REGULARES",
            categoria: "SAÚDE E BEM-ESTAR",
            significado: "Testes realizados periodicamente para monitorar a saúde."
        },
        palavra035 = {
            nome: "SAUDE OCULAR",
            categoria: "SAÚDE E BEM-ESTAR",
            significado: "Condição de ter olhos saudáveis e visão clara."
        },
        palavra036 = {
            nome: "VACINACAO",
            categoria: "SAÚDE E BEM-ESTAR",
            significado: "Administração de vacinas para prevenir doenças infecciosas."
        },
        palavra037 = {
            nome: "SAUDE DENTAL",
            categoria: "SAÚDE E BEM-ESTAR",
            significado: "Manutenção da saúde dos dentes e gengivas."
        },
        palavra038 = {
            nome: "POSTURA",
            categoria: "SAÚDE E BEM-ESTAR",
            significado: "Posição correta do corpo ao ficar em pé, sentado ou deitado."
        },
        palavra039 = {
            nome: "ACUPUNTURA",
            categoria: "SAÚDE E BEM-ESTAR",
            significado: "Terapia tradicional chinesa que utiliza agulhas finas inseridas em pontos específicos do corpo."
        },
        palavra040 = {
            nome: "HARMONIA",
            categoria: "SAÚDE E BEM-ESTAR",
            significado: "Estado de paz e equilíbrio entre os diferentes aspectos da vida."
        },
        palavra041 = {
            nome: "AROMATERAPIA",
            categoria: "SAÚDE E BEM-ESTAR",
            significado: "Uso de óleos essenciais para promover o bem-estar físico e emocional."
        },
        palavra042 = {
            nome: "FITOTERAPIA",
            categoria: "SAÚDE E BEM-ESTAR",
            significado: "Uso de plantas e ervas medicinais para tratar doenças."
        },
        palavra043 = {
            nome: "SAUNA",
            categoria: "SAÚDE E BEM-ESTAR",
            significado: "Banho de vapor ou calor seco para relaxamento e desintoxicação."
        },
        palavra044 = {
            nome: "BANHO DE ERVAS",
            categoria: "SAÚDE E BEM-ESTAR",
            significado: "Imersão em água infundida com ervas para promover a saúde e o bem-estar."
        },
        palavra045 = {
            nome: "TERAPIA HOLISTICA",
            categoria: "SAÚDE E BEM-ESTAR",
            significado: "Abordagem terapêutica que trata o indivíduo como um todo, incluindo aspectos físicos, mentais e espirituais."
        },
        palavra046 = {
            nome: "CROMOTERAPIA",
            categoria: "SAÚDE E BEM-ESTAR",
            significado: "Uso de cores para equilibrar a energia do corpo e promover a saúde."
        },
        palavra047 = {
            nome: "MEDITACAO GUIADA",
            categoria: "SAÚDE E BEM-ESTAR",
            significado: "Prática de meditação orientada por um instrutor ou gravação de áudio."
        },
        palavra048 = {
            nome: "AUTOCUIDADO",
            categoria: "SAÚDE E BEM-ESTAR",
            significado: "Práticas que uma pessoa adota para manter sua saúde e bem-estar."
        },
        palavra049 = {
            nome: "REIKI",
            categoria: "SAÚDE E BEM-ESTAR",
            significado: "Terapia energética japonesa que promove a cura através da imposição das mãos."
        },
        palavra050 = {
            nome: "RESPIRACAO",
            categoria: "SAÚDE E BEM-ESTAR",
            significado: "Ato de inalar e exalar ar, essencial para a vida e saúde."
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
        categoria: addCategoria,
        significado: addSignificado
    }

    palavras.push(palavra);
    sortear();

    document.getElementById("addPalavra").value = "";
    document.getElementById("addCategoria").value = "";
    document.getElementById("addSignificado").value = "";
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
    teclas[i].addEventListener('click', function () {
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