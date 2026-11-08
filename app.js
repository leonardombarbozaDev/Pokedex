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
            mostrarMensagem(t("noPokemon"));
            return;
        }

        // Evita sobrecarregar a página em pesquisas muito amplas.
        const limite = 80;
        const selecionados = correspondentes.slice(0, limite);
        const detalhes = await Promise.all(selecionados.map(item => obterDetalhes(item.url)));
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

function restaurarAlbum() {
    resultado.innerHTML = "";
    resultado.classList.remove("visivel");
    renderizar(pokemonsIniciais);
}

campoPesquisa.addEventListener("input", () => {
    clearTimeout(temporizador);
    const termo = campoPesquisa.value.trim();
    if (!termo) {
        pesquisaAtual++;
        resultado.innerHTML = "";
        resultado.classList.remove("visivel");
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
renderizar(pokemonsIniciais);
aplicarIdioma();
atualizarUltimaPesquisa();
