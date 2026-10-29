const campoPesquisa = document.querySelector("#filter");
const resultado = document.querySelector("#pokemon-pesquisado");

let temporizador;
let pesquisaAtual = 0;

campoPesquisa.addEventListener("input", () => {
    clearTimeout(temporizador);

    const nome = campoPesquisa.value.trim().toLowerCase();
    const idPesquisa = ++pesquisaAtual;

    if (nome === "") {
        resultado.innerHTML = "";
        resultado.classList.remove("visivel");
        return;
    }

    temporizador = setTimeout(() => {
        buscarPokemon(nome, idPesquisa);
    }, 400);
});

async function buscarPokemon(nome, idPesquisa) {
    resultado.innerHTML = '<p class="mensagem">Pesquisando Pokémon...</p>';
    resultado.classList.add("visivel");

    try {
        const resposta = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(nome)}`
        );

        if (idPesquisa !== pesquisaAtual) return;

        if (!resposta.ok) {
            resultado.innerHTML =
                '<p class="mensagem">Pokémon não encontrado. Tente outro nome!</p>';
            return;
        }

        const pokemon = await resposta.json();

        if (idPesquisa !== pesquisaAtual) return;

        mostrarPokemon(pokemon);

    } catch (erro) {
        if (idPesquisa !== pesquisaAtual) return;

        resultado.innerHTML =
            '<p class="mensagem">Erro na pesquisa. Verifique sua internet.</p>';

        console.error(erro);
    }
}

function mostrarPokemon(pokemon) {
    const nome = pokemon.name;
    const numero = pokemon.id;

    const imagem =
        pokemon.sprites.other["official-artwork"].front_default ||
        pokemon.sprites.front_default ||
        "";

    const tipos = pokemon.types.map(item => item.type.name);

    resultado.innerHTML = `
        <article class="cartao-pokemon">
            <div class="imagem-pokemon">
                ${
                    imagem
                        ? `<img src="${imagem}" alt="${nome}">`
                        : "<p>Imagem indisponível</p>"
                }
            </div>

            <div class="informacoes">
                <h2>${nome}</h2>
                <p>Pokédex: #${numero}</p>
                <ul>
                    ${tipos.map(tipo => `<li>${tipo}</li>`).join("")}
                </ul>
            </div>
        </article>
    `;

    resultado.classList.add("visivel");
}