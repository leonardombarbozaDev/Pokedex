const grade = document.querySelector("#grade-pokemon");
const campoPesquisa = document.querySelector("#filter");
const formularioPesquisa = document.querySelector("#form-pesquisa");
const botaoLimpar = document.querySelector("#limpar-pesquisa");
const resultado = document.querySelector("#pokemon-pesquisado");
const ultimaPesquisa = document.querySelector("#ultima-pesquisa");
const seletorIdioma = document.querySelector("#idioma");

const traducoes = {
    pt: { title:"ÁLBUM POKÉMON", languageLabel:"Idioma:", placeholder:"Pesquisar Pokémon...", searchLabel:"Pesquisar Pokémon", search:"Pesquisar", clear:"Limpar", aboutTitle:"Sobre o Projeto", projectLabel:"Projeto:", projectName:"Álbum Pokémon", courseLabel:"Curso:", courseName:"Ciência da Computação", collegeLabel:"Faculdade:", technologiesLabel:"Tecnologias:", objectiveLabel:"Objetivo:", objectiveText:"Apresentar e pesquisar Pokémon", namesLabel:"Nomes:", noResults:"Nenhum Pokémon encontrado.", searching:"Pesquisando Pokémon...", lastSearch:"Última pesquisa:", repeatSearch:"Pesquisar novamente", searchExact:"Resultado da pesquisa", typeTitle:"Pokémon do tipo", startsTitle:"Pokémon começando com", noPokemon:"Nenhum Pokémon encontrado. Confira o nome, o tipo ou as iniciais.", searchHint:"Digite o nome, o tipo ou as iniciais de um Pokémon.", loadError:"Não foi possível carregar os Pokémon. Verifique sua conexão com a internet e tente novamente.", pokedex:"Pokédex:", showing:"Exibindo os primeiros", of:"de", results:"resultados. Digite mais letras para refinar." },
    en: { title:"POKÉMON ALBUM", languageLabel:"Language:", placeholder:"Search Pokémon...", searchLabel:"Search Pokémon", search:"Search", clear:"Clear", aboutTitle:"About the Project", projectLabel:"Project:", projectName:"Pokémon Album", courseLabel:"Course:", courseName:"Computer Science", collegeLabel:"College:", technologiesLabel:"Technologies:", objectiveLabel:"Objective:", objectiveText:"Display and search for Pokémon", namesLabel:"Names:", noResults:"No Pokémon found.", searching:"Searching for Pokémon...", lastSearch:"Last search:", repeatSearch:"Search again", searchExact:"Search result", typeTitle:"Pokémon of type", startsTitle:"Pokémon starting with", noPokemon:"No Pokémon found. Check the name, type, or first letters.", searchHint:"Enter a Pokémon name, type, or first letters.", loadError:"Could not load Pokémon. Check your internet connection and try again.", pokedex:"Pokédex:", showing:"Showing the first", of:"of", results:"results. Type more letters to refine your search." },
    es: { title:"ÁLBUM POKÉMON", languageLabel:"Idioma:", placeholder:"Buscar Pokémon...", searchLabel:"Buscar Pokémon", search:"Buscar", clear:"Limpiar", aboutTitle:"Sobre el proyecto", projectLabel:"Proyecto:", projectName:"Álbum Pokémon", courseLabel:"Curso:", courseName:"Ciencias de la Computación", collegeLabel:"Universidad:", technologiesLabel:"Tecnologías:", objectiveLabel:"Objetivo:", objectiveText:"Presentar y buscar Pokémon", namesLabel:"Integrantes:", noResults:"No se encontraron Pokémon.", searching:"Buscando Pokémon...", lastSearch:"Última búsqueda:", repeatSearch:"Buscar de nuevo", searchExact:"Resultado de la búsqueda", typeTitle:"Pokémon de tipo", startsTitle:"Pokémon que empiezan con", noPokemon:"No se encontraron Pokémon. Comprueba el nombre, el tipo o las primeras letras.", searchHint:"Escribe el nombre, el tipo o las primeras letras de un Pokémon.", loadError:"No se pudieron cargar los Pokémon. Comprueba tu conexión a internet e inténtalo de nuevo.", pokedex:"Pokédex:", showing:"Mostrando los primeros", of:"de", results:"resultados. Escribe más letras para precisar la búsqueda." }
};

let idiomaAtual = localStorage.getItem("idiomaPokemon") || "pt";
if (!traducoes[idiomaAtual]) idiomaAtual = "pt";
function t(chave) { return traducoes[idiomaAtual][chave] || chave; }
function aplicarIdioma() {
    document.documentElement.lang = idiomaAtual === "pt" ? "pt-br" : idiomaAtual === "es" ? "es" : "en";
    document.querySelectorAll("[data-i18n]").forEach(el => { el.textContent = t(el.dataset.i18n); });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => { el.placeholder = t(el.dataset.i18nPlaceholder); });
    document.querySelectorAll("[data-i18n-aria]").forEach(el => { el.setAttribute("aria-label", t(el.dataset.i18nAria)); });
    atualizarUltimaPesquisa();
    if (campoPesquisa.value.trim()) executarPesquisa(campoPesquisa.value.trim());
    else restaurarAlbum();
}

const tiposTraduzidos = { normal:"normal", fuego:"fire", fogo:"fire", agua:"water", agua:"water", eléctrico:"electric", electrico:"electric", hierba:"grass", planta:"grass", hielo:"ice", lucha:"fighting", luchador:"fighting", veneno:"poison", tierra:"ground", volador:"flying", psíquico:"psychic", psiquico:"psychic", bicho:"bug", roca:"rock", fantasma:"ghost", dragón:"dragon", dragon:"dragon", siniestro:"dark", acero:"steel", hada:"fairy", fogo:"fire", fire:"fire", agua:"water", água:"water", water:"water", eletrico:"electric", elétrico:"electric", electric:"electric", grama:"grass", grass:"grass", gelo:"ice", ice:"ice", lutador:"fighting", fighting:"fighting", veneno:"poison", poison:"poison", terra:"ground", ground:"ground", voador:"flying", flying:"flying", psiquico:"psychic", psíquico:"psychic", psychic:"psychic", inseto:"bug", bug:"bug", pedra:"rock", rock:"rock", fantasma:"ghost", ghost:"ghost", dragao:"dragon", dragão:"dragon", dragon:"dragon", sombrio:"dark", dark:"dark", aço:"steel", steel:"steel", fada:"fairy", fairy:"fairy" };
const nomesTipos = { normal:{pt:"Normal",en:"Normal",es:"Normal"}, fire:{pt:"Fogo",en:"Fire",es:"Fuego"}, water:{pt:"Água",en:"Water",es:"Agua"}, electric:{pt:"Elétrico",en:"Electric",es:"Eléctrico"}, grass:{pt:"Grama",en:"Grass",es:"Planta"}, ice:{pt:"Gelo",en:"Ice",es:"Hielo"}, fighting:{pt:"Lutador",en:"Fighting",es:"Lucha"}, poison:{pt:"Veneno",en:"Poison",es:"Veneno"}, ground:{pt:"Terra",en:"Ground",es:"Tierra"}, flying:{pt:"Voador",en:"Flying",es:"Volador"}, psychic:{pt:"Psíquico",en:"Psychic",es:"Psíquico"}, bug:{pt:"Inseto",en:"Bug",es:"Bicho"}, rock:{pt:"Pedra",en:"Rock",es:"Roca"}, ghost:{pt:"Fantasma",en:"Ghost",es:"Fantasma"}, dragon:{pt:"Dragão",en:"Dragon",es:"Dragón"}, dark:{pt:"Sombrio",en:"Dark",es:"Siniestro"}, steel:{pt:"Aço",en:"Steel",es:"Acero"}, fairy:{pt:"Fada",en:"Fairy",es:"Hada"} };
function traduzirTipo(tipo) { return nomesTipos[tipo]?.[idiomaAtual] || nomeBonito(tipo); }

let temporizador;
let pesquisaAtual = 0;
let listaNomes = null;

const tiposPokemon = [
    "normal", "fire", "water", "electric", "grass", "ice", "fighting",
    "poison", "ground", "flying", "psychic", "bug", "rock", "ghost",
    "dragon", "dark", "steel", "fairy"
];

const pokemonsIniciais = [
    { id: 1, nome: "Bulbasaur", tipos: ["Poison", "Grass"], imagem: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png" },
    { id: 2, nome: "Ivysaur", tipos: ["Poison", "Grass"], imagem: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png" },
    { id: 3, nome: "Venusaur", tipos: ["Poison", "Grass"], imagem: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png" },
    { id: 4, nome: "Charmander", tipos: ["Fire"], imagem: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png" },
    { id: 5, nome: "Charmeleon", tipos: ["Fire"], imagem: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/5.png" },
    { id: 6, nome: "Charizard", tipos: ["Fire", "Flying"], imagem: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png" },
    { id: 7, nome: "Squirtle", tipos: ["Water"], imagem: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png" },
    { id: 8, nome: "Wartortle", tipos: ["Water"], imagem: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/8.png" }
];

function nomeBonito(nome) {
    return nome.charAt(0).toUpperCase() + nome.slice(1);
}

function criarCartao(pokemon) {
    const cartao = document.createElement("article");
    cartao.className = "cartao-pokemon";

    const imagemContainer = document.createElement("div");
    imagemContainer.className = "imagem-pokemon";
    const imagem = document.createElement("img");
    imagem.src = pokemon.imagem;
    imagem.alt = pokemon.nome;
    imagem.loading = "lazy";
    imagemContainer.appendChild(imagem);

    const informacoes = document.createElement("div");
    informacoes.className = "informacoes";
    const nome = document.createElement("h2");
    nome.textContent = pokemon.nome;
    const numero = document.createElement("p");
    numero.textContent = `${t("pokedex")} #${pokemon.id}`;
    const listaTipos = document.createElement("ul");

    pokemon.tipos.forEach(tipo => {
        const item = document.createElement("li");
        item.textContent = traduzirTipo(tipo);
        listaTipos.appendChild(item);
    });

    informacoes.append(nome, numero, listaTipos);
    cartao.append(imagemContainer, informacoes);
    if (pokemonsAdicionados.some(item => item.id === pokemon.id)) {
        const acoes = document.createElement("div");
        acoes.className = "acoes-cartao";
        const editar = document.createElement("button");
        editar.type = "button";
        editar.className = "botao-pesquisa";
        editar.textContent = "Editar";
        editar.addEventListener("click", () => editarPokemon(pokemon.id));
        const excluir = document.createElement("button");
        excluir.type = "button";
        excluir.className = "botao-pesquisa";
        excluir.textContent = "Excluir";
        excluir.addEventListener("click", () => excluirPokemon(pokemon.id));
        acoes.append(editar, excluir);
        cartao.appendChild(acoes);
        if (pokemon.criadoEm) {
            const data = new Date(pokemon.criadoEm);
            if (!Number.isNaN(data.getTime())) {
                const dataTexto = document.createElement("p");
                dataTexto.className = "data-cadastro";
                dataTexto.textContent = "Adicionado em: " + data.toLocaleDateString("pt-BR");
                cartao.appendChild(dataTexto);
            }
        }
    }
    return cartao;
}

function renderizar(lista, destino = grade) {
    destino.innerHTML = "";
    if (!lista.length) {
        destino.innerHTML = `<p class="mensagem">${t("noResults")}</p>`;
        return;
    }
    lista.forEach(pokemon => destino.appendChild(criarCartao(pokemon)));
}

function mostrarMensagem(mensagem) {
    resultado.innerHTML = `<p class="mensagem">${mensagem}</p>`;
    resultado.classList.add("visivel");
}

async function obterListaNomes() {
    if (listaNomes) return listaNomes;
    const resposta = await fetch("https://pokeapi.co/api/v2/pokemon?limit=2000");
    if (!resposta.ok) throw new Error("Não foi possível carregar a lista de Pokémon.");
    const dados = await resposta.json();
    listaNomes = dados.results;
    return listaNomes;
}

async function obterDetalhes(url) {
    const resposta = await fetch(url);
    if (!resposta.ok) throw new Error("Falha ao carregar Pokémon.");
    const p = await resposta.json();
    return {
        id: p.id,
        nome: nomeBonito(p.name),
        tipos: p.types.map(item => item.type.name),
        imagem: p.sprites?.other?.["official-artwork"]?.front_default ||
                p.sprites?.front_default || ""
    };
}

function salvarUltimaPesquisa(termo) {
    try {
        localStorage.setItem("ultimaPesquisaPokemon", termo);
    } catch (erro) {
        console.warn("Não foi possível salvar a pesquisa neste navegador.");
    }
    atualizarUltimaPesquisa();
}

function atualizarUltimaPesquisa() {
    let termo = "";
    try {
        termo = localStorage.getItem("ultimaPesquisaPokemon") || "";
    } catch (erro) {}
    ultimaPesquisa.innerHTML = "";
    if (!termo) return;

    const texto = document.createElement("span");
    texto.textContent = t("lastSearch") + " ";
    const botao = document.createElement("button");
    botao.type = "button";
    botao.className = "ultima-pesquisa-botao";
    botao.textContent = termo;
    botao.title = t("repeatSearch");
    botao.addEventListener("click", () => {
        campoPesquisa.value = termo;
        executarPesquisa(termo);
    });
    ultimaPesquisa.append(texto, botao);
    ultimaPesquisa.classList.add("ativa");
}

async function executarPesquisa(termo) {
    const buscaOriginal = termo.trim().toLowerCase();
    const buscaNormalizada = buscaOriginal.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const busca = tiposTraduzidos[buscaNormalizada] || tiposTraduzidos[buscaOriginal] || buscaOriginal;
    const idPesquisa = ++pesquisaAtual;
    if (!busca) return;

    salvarUltimaPesquisa(termo.trim());
    resultado.innerHTML = "";
    mostrarMensagem(t("searching"));

    try {
        // Pesquisa por elemento/tipo
        if (tiposPokemon.includes(busca)) {
            const resposta = await fetch(`https://pokeapi.co/api/v2/type/${busca}`);
            if (!resposta.ok) throw new Error("Tipo não encontrado.");
            const dados = await resposta.json();
            const urls = dados.pokemon.map(item => item.pokemon.url);
            const detalhes = await Promise.all(urls.map(obterDetalhes));
            detalhes.push(...pokemonsAdicionados.filter(p => p.tipos.includes(busca) && !detalhes.some(d => d.id === p.id)));
            if (idPesquisa !== pesquisaAtual) return;
            resultado.innerHTML = `<h2 class="titulo-resultados">${t("typeTitle")} ${traduzirTipo(busca)} (${detalhes.length})</h2>`;
            const gradeResultados = document.createElement("div");
            gradeResultados.className = "grade-pokemon";
            resultado.appendChild(gradeResultados);
            if (detalhes.length === 1) gradeResultados.classList.add("resultado-unico");
            renderizar(detalhes, gradeResultados);
            centralizarResultados();
            return;
        }

        const nomes = await obterListaNomes();
        if (idPesquisa !== pesquisaAtual) return;

        const exato = nomes.find(item => item.name === busca);
        let correspondentes;
        let titulo;

        if (exato) {
            correspondentes = [exato];
            titulo = t("searchExact");
        } else {
            correspondentes = nomes.filter(item => item.name.startsWith(busca));
            titulo = `${t("startsTitle")} "${nomeBonito(busca)}" (${correspondentes.length})`;
        }

        if (!correspondentes.length) {
            const locais = pokemonsAdicionados.filter(p => p.nome.toLowerCase().startsWith(busca));
            if (locais.length) {
                resultado.innerHTML = "";
                const gradeLocal = document.createElement("div");
                gradeLocal.className = "grade-pokemon";
                resultado.appendChild(gradeLocal);
                renderizar(locais, gradeLocal);
                centralizarResultados();
                return;
            }
            mostrarMensagem(t("noPokemon"));
            return;
        }

        // Evita sobrecarregar a página em pesquisas muito amplas.
        const limite = 80;
        const selecionados = correspondentes.slice(0, limite);
        const detalhes = await Promise.all(selecionados.map(item => obterDetalhes(item.url)));
        const locais = pokemonsAdicionados.filter(p => p.nome.toLowerCase().startsWith(busca));
        detalhes.push(...locais.filter(p => !detalhes.some(d => d.id === p.id)));
        if (idPesquisa !== pesquisaAtual) return;

        resultado.innerHTML = `<h2 class="titulo-resultados">${titulo}</h2>`;
        if (correspondentes.length > limite) {
            const aviso = document.createElement("p");
            aviso.className = "aviso-resultados";
            aviso.textContent = `${t("showing")} ${limite} ${t("of")} ${correspondentes.length} ${t("results")}`;
            resultado.appendChild(aviso);
        }
        const gradeResultados = document.createElement("div");
        gradeResultados.className = "grade-pokemon";
        resultado.appendChild(gradeResultados);
        if (detalhes.length === 1) gradeResultados.classList.add("resultado-unico");
        renderizar(detalhes, gradeResultados);
        centralizarResultados();
    } catch (erro) {
        if (idPesquisa !== pesquisaAtual) return;
        mostrarMensagem(t("loadError"));
        console.error(erro);
    }
}

function centralizarResultados() {
    // Leva os resultados para o centro da tela depois que os cartões forem exibidos.
    requestAnimationFrame(() => {
        resultado.scrollIntoView({ behavior: "smooth", block: "center" });
    });
}

const pokemonsAdicionados = (() => {
    try { const dados = JSON.parse(localStorage.getItem("pokemonsAdicionados") || "[]"); return Array.isArray(dados) ? dados : []; }
    catch { return []; }
})();

function restaurarAlbum() {
    resultado.innerHTML = "";
    resultado.classList.remove("visivel");
    renderizar([...pokemonsIniciais, ...pokemonsAdicionados]);
}

campoPesquisa.addEventListener("input", () => {
    clearTimeout(temporizador);
    const termo = campoPesquisa.value.trim();
    if (!termo) {
        pesquisaAtual++;
        restaurarAlbum();
        return;
    }
    temporizador = setTimeout(() => executarPesquisa(termo), 450);
});

formularioPesquisa.addEventListener("submit", evento => {
    evento.preventDefault();
    clearTimeout(temporizador);
    const termo = campoPesquisa.value.trim();
    if (!termo) {
        mostrarMensagem(t("searchHint"));
        campoPesquisa.focus();
        return;
    }
    executarPesquisa(termo);
});

botaoLimpar.addEventListener("click", () => {
    clearTimeout(temporizador);
    pesquisaAtual++;
    campoPesquisa.value = "";
    restaurarAlbum();
    atualizarUltimaPesquisa();
    campoPesquisa.focus();
});

const botaoInfo = document.querySelector("#btn-informacoes");
const painelInfo = document.querySelector("#painel-informacoes");
const fecharInfo = document.querySelector("#fechar-informacoes");

botaoInfo.addEventListener("click", () => painelInfo.classList.toggle("ativo"));
fecharInfo.addEventListener("click", () => painelInfo.classList.remove("ativo"));

seletorIdioma.value = idiomaAtual;
seletorIdioma.addEventListener("change", () => {
    idiomaAtual = seletorIdioma.value;
    localStorage.setItem("idiomaPokemon", idiomaAtual);
    aplicarIdioma();
});
renderizar([...pokemonsIniciais, ...pokemonsAdicionados]);
aplicarIdioma();
atualizarUltimaPesquisa();

const modalAdicionar = document.querySelector("#modal-pokemon");
const abrirAdicionar = document.querySelector("#abrir-modal-pokemon");
const fecharAdicionar = document.querySelector("#fechar-modal-pokemon");
function fecharCadastro() { modalAdicionar.classList.remove("aberto"); document.body.classList.remove("modal-aberto"); }
abrirAdicionar.addEventListener("click", () => { modalAdicionar.classList.add("aberto"); document.body.classList.add("modal-aberto"); document.querySelector("#nome-pokemon").focus(); });
fecharAdicionar.addEventListener("click", fecharCadastro);
modalAdicionar.addEventListener("click", e => { if (e.target === modalAdicionar) fecharCadastro(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") fecharCadastro(); });
let pokemonEmEdicao = null;
const formularioPokemon = document.querySelector("#form-pokemon");
const mensagemCadastro = document.querySelector("#mensagem-form");
const tituloCadastro = document.querySelector("#titulo-modal-pokemon");
const botaoSalvarPokemon = formularioPokemon.querySelector('button[type="submit"]');
const camposCadastro = ["nome-pokemon", "numero-pokemon", "tipo-pokemon", "imagem-pokemon"];

// Mostra a mensagem imediatamente abaixo do campo correspondente, sem alert.
camposCadastro.forEach(id => {
    const campo = document.getElementById(id);
    const aviso = document.createElement("small");
    aviso.className = "erro-campo";
    aviso.id = `erro-${id}`;
    aviso.setAttribute("aria-live", "polite");
    campo.insertAdjacentElement("afterend", aviso);
    campo.addEventListener("input", () => limparErro(id));
    campo.addEventListener("change", () => limparErro(id));
});
function limparErro(id) {
    document.getElementById(`erro-${id}`).textContent = "";
    document.getElementById(id).removeAttribute("aria-invalid");
}
function mostrarErro(id, texto) {
    document.getElementById(`erro-${id}`).textContent = texto;
    document.getElementById(id).setAttribute("aria-invalid", "true");
}
function limparErros() { camposCadastro.forEach(limparErro); mensagemCadastro.textContent = ""; }
function salvarPokemons() {
    try {
        localStorage.setItem("pokemonsAdicionados", JSON.stringify(pokemonsAdicionados));
        return true;
    } catch (erro) {
        console.warn("Não foi possível salvar localmente", erro);
        mensagemCadastro.textContent = "Não foi possível salvar no navegador.";
        return false;
    }
}
function atualizarAlbum() {
    campoPesquisa.value = "";
    pesquisaAtual++;
    restaurarAlbum();
    atualizarEstatisticas();
}
function atualizarEstatisticas() {
    const total = pokemonsIniciais.length + pokemonsAdicionados.length;
    // Math é usado para calcular a porcentagem de Pokémon cadastrados.
    const porcentagem = total ? Math.round((pokemonsAdicionados.length / total) * 100) : 0;
    document.getElementById("estatisticas-album").textContent =
        `Total: ${total} Pokémon | Adicionados: ${pokemonsAdicionados.length} (${porcentagem}%)`;
}
function editarPokemon(id) {
    const pokemon = pokemonsAdicionados.find(p => p.id === id);
    if (!pokemon) return;
    pokemonEmEdicao = id;
    limparErros();
    document.getElementById("nome-pokemon").value = pokemon.nome;
    document.getElementById("numero-pokemon").value = pokemon.id;
    document.getElementById("tipo-pokemon").value = pokemon.tipos[0] || "";
    document.getElementById("imagem-pokemon").value = pokemon.imagem || "";
    tituloCadastro.textContent = "Editar Pokémon";
    botaoSalvarPokemon.textContent = "Salvar alterações";
    modalAdicionar.classList.add("aberto");
    document.body.classList.add("modal-aberto");
}
function excluirPokemon(id) {
    const indice = pokemonsAdicionados.findIndex(p => p.id === id);
    if (indice < 0) return;
    if (!confirm(`Deseja excluir ${pokemonsAdicionados[indice].nome} do álbum?`)) return;
    const removido = pokemonsAdicionados.splice(indice, 1)[0];
    if (!salvarPokemons()) { pokemonsAdicionados.splice(indice, 0, removido); return; }
    atualizarAlbum();
}
function prepararNovoCadastro() {
    pokemonEmEdicao = null;
    formularioPokemon.reset();
    limparErros();
    tituloCadastro.textContent = "Adicionar Pokémon";
    botaoSalvarPokemon.textContent = "Salvar Pokémon";
}
abrirAdicionar.addEventListener("click", prepararNovoCadastro);
formularioPokemon.noValidate = true;
formularioPokemon.addEventListener("submit", e => {
    e.preventDefault();
    limparErros();
    const nome = document.querySelector("#nome-pokemon").value.trim();
    const idTexto = document.querySelector("#numero-pokemon").value.trim();
    const id = Number(idTexto);
    const tipos = [document.querySelector("#tipo-pokemon").value].filter(Boolean);
    const imagemInformada = document.querySelector("#imagem-pokemon").value.trim();
    let valido = true;
    if (!nome) { mostrarErro("nome-pokemon", "Informe o nome do Pokémon."); valido = false; }
    if (!idTexto || !Number.isSafeInteger(id) || id < 1) {
        mostrarErro("numero-pokemon", "Informe um número inteiro maior que zero."); valido = false;
    } else if ([...pokemonsIniciais, ...pokemonsAdicionados].some(p => p.id === id && p.id !== pokemonEmEdicao)) {
        mostrarErro("numero-pokemon", "Já existe um Pokémon com esse número."); valido = false;
    }
    if (!tipos.length) { mostrarErro("tipo-pokemon", "Selecione um tipo."); valido = false; }
    if (imagemInformada) {
        try {
            const url = new URL(imagemInformada);
            if (!["http:", "https:"].includes(url.protocol)) throw new Error("Protocolo inválido");
        } catch {
            mostrarErro("imagem-pokemon", "Informe uma URL válida ou deixe em branco.");
            valido = false;
        }
    }
    if (!valido) { mensagemCadastro.textContent = "Corrija os campos indicados."; return; }
    const imagem = imagemInformada || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
    if (pokemonEmEdicao !== null) {
        const indice = pokemonsAdicionados.findIndex(p => p.id === pokemonEmEdicao);
        if (indice < 0) return;
        const anterior = { ...pokemonsAdicionados[indice] };
        pokemonsAdicionados[indice] = { ...anterior, id, nome, tipos, imagem };
        if (!salvarPokemons()) { pokemonsAdicionados[indice] = anterior; return; }
        mensagemCadastro.textContent = "Pokémon atualizado com sucesso!";
    } else {
        // Date registra quando o Pokémon foi adicionado.
        pokemonsAdicionados.push({ id, nome, tipos, imagem, criadoEm: new Date().toISOString() });
        if (!salvarPokemons()) { pokemonsAdicionados.pop(); return; }
        mensagemCadastro.textContent = "Pokémon adicionado com sucesso!";
    }
    atualizarAlbum();
    pokemonEmEdicao = null;
    tituloCadastro.textContent = "Adicionar Pokémon";
    botaoSalvarPokemon.textContent = "Salvar Pokémon";
    formularioPokemon.reset();
});
atualizarEstatisticas();
