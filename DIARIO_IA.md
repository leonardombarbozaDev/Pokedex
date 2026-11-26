## 29/10 – Naihara – ChatGPT

**Prompt:** "Estou desenvolvendo um álbum de Pokémon utilizando HTML, CSS e JavaScript. Como posso gerar os cartões dinamicamente pelo JavaScript, evitando a repetição de código no HTML e mantendo o layout que já desenvolvi?"

**Resposta:** A IA sugeriu utilizar um vetor de objetos e uma função renderizar(lista), responsável por percorrer os dados e criar os cartões automaticamente.

**Aceitei:** A utilização do vetor de objetos e da função de renderização para facilitar a criação dos cartões.

**Rejeitei:** Substituir toda a estrutura visual que já estava pronta.

---

## 29/10 – Naihara – ChatGPT

**Prompt:** "Como posso estruturar os dados dos Pokémon em um vetor de objetos no JavaScript, armazenando nome, número, tipos e imagem, de maneira que essas informações possam ser utilizadas na pesquisa e na criação dos cartões?"

**Resposta:** A IA sugeriu criar objetos com propriedades específicas para cada Pokémon e armazená-los dentro de um array.

**Aceitei:** Organizar os dados dos Pokémon em objetos no JavaScript, facilitando o acesso às informações.

**Rejeitei:** Alterar os nomes e a organização das variáveis que já utilizava no projeto.

---

## 29/10 – Leonardo – ChatGPT

**Prompt:** "Meu projeto precisa utilizar pelo menos três tipos diferentes de eventos em JavaScript. Como posso implementar os eventos input, submit e click na barra de pesquisa e no botão de limpar, sem prejudicar as funcionalidades existentes?"

**Resposta:** A IA sugeriu utilizar addEventListener() para identificar a digitação, o envio do formulário e os cliques nos botões.

**Aceitei:** Adicionar os eventos para melhorar a pesquisa e permitir limpar o campo.

**Rejeitei:** Remover a pesquisa que já funcionava.

---

## 22/10 – André – ChatGPT

**Prompt:** "Como posso implementar uma pesquisa automática de Pokémon enquanto o usuário digita, evitando que sejam realizadas várias consultas desnecessárias à API a cada letra digitada?"

**Resposta:** A IA sugeriu utilizar o evento input juntamente com um pequeno intervalo de tempo (debounce) antes de executar a função de pesquisa.

**Aceitei:** Manter a pesquisa automática com um intervalo antes de realizar a consulta.

**Rejeitei:** Alterar completamente o funcionamento original da pesquisa.

---

## 29/10 – Naihara – ChatGPT

**Prompt:** "Como posso criar um botão de informações no canto superior direito da Pokédex que, ao ser clicado, abra um painel com os dados do projeto, dos integrantes e das tecnologias utilizadas, sem ocupar espaço permanentemente na página?"

**Resposta:** A IA explicou como criar um botão e um painel de informações utilizando HTML, CSS e JavaScript, controlando sua abertura e seu fechamento.

**Aceitei:** Adicionar o botão no canto superior direito e apresentar as informações somente quando solicitado pelo usuário.

**Rejeitei:** Deixar as informações aparecendo na tela o tempo todo.

---

## 08/11 – Ana – ChatGPT

**Prompt:** "Como posso implementar uma opção de tradução no meu site utilizando JavaScript, permitindo que o usuário alterne entre português e inglês sem precisar criar uma página HTML diferente para cada idioma?"

**Resposta:** A IA explicou como utilizar HTML, CSS e JavaScript para criar opções de idioma e alterar dinamicamente os textos da página.

**Aceitei:** Adicionar as opções de português e inglês no canto superior direito, permitindo que o usuário escolha o idioma.

**Rejeitei:** Manter a página em apenas um idioma, sem opção de tradução.

---

## 29/10 – Mariana – ChatGPT

**Prompt:** "Como posso posicionar imagens decorativas nos cantos superiores da Pokédex utilizando CSS, sem interferir na centralização do título e sem fazer com que as imagens acompanhem o usuário durante a rolagem da página?"

**Resposta:** A IA sugeriu utilizar position: absolute e ajustar as propriedades top, left e right para controlar o posicionamento das imagens.

**Aceitei:** Manter apenas uma imagem no canto esquerdo, sem acompanhar a rolagem da página.

**Rejeitei:** Utilizar position: fixed, pois a imagem acompanharia a tela durante a rolagem.

---

## 12/11 – Mariana – ChatGPT

**Prompt:** "Considerando que os dados dos Pokémon estão organizados em um vetor de objetos, como posso reutilizar uma função de renderização para atualizar os cartões exibidos após uma pesquisa, sem precisar duplicar o código HTML?"

**Resposta:** A IA sugeriu utilizar uma função renderizar(lista), que recebe os dados e atualiza dinamicamente os cartões apresentados na página.

**Aceitei:** Reutilizar o vetor de objetos e a função de renderização.

**Rejeitei:** Substituir toda a estrutura visual que já estava pronta.

---

## 12/11 – André – ChatGPT

**Prompt:** "Como posso reorganizar o cabeçalho da Pokédex utilizando CSS para posicionar o seletor de idiomas e o botão de informações lado a lado no canto superior direito, mantendo o título centralizado e evitando a sobreposição dos elementos?"

**Resposta:** A IA sugeriu organizar os elementos do cabeçalho pelo CSS, ajustando o posicionamento e o espaçamento entre eles.

**Aceitei:** Posicionar os dois elementos lado a lado na parte superior direita.

**Rejeitei:** Alterar o título e a estrutura principal do site.

---

## 12/11 – André – ChatGPT

**Prompt:** "Meu projeto possui funcionalidades de cadastro, edição e exclusão de Pokémon. Como posso utilizar o localStorage e os métodos JSON.stringify() e JSON.parse() para manter essas alterações salvas mesmo depois que o usuário atualizar ou fechar a página, sem utilizar um banco de dados externo?"

---

23/10 – [Naihara] – ChatGPT

Prompt: "Como posso utilizar o GitHub Pages para publicar a Pokédex gratuitamente e gerar um link que permita acessar o site pelo computador e pelo celular?"

Resposta: A IA explicou como acessar Settings, selecionar Pages, escolher a opção Deploy from a branch e configurar a branch main com a pasta root.

Aceitei: Utilizar o GitHub Pages para publicar o projeto.

Rejeitei: Utilizar uma plataforma de hospedagem paga.

**Resposta:** A IA sugeriu utilizar o localStorage para armazenar os dados dos Pokémon, convertendo os objetos em texto para salvar e recuperando as informações quando a página for aberta novamente.

**Aceitei:** Utilizar o localStorage para manter as alterações realizadas no mesmo navegador.

**Rejeitei:** Utilizar um banco de dados externo, pois o armazenamento local atende às necessidades atuais do projeto.
