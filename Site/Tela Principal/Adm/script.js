const body = document.querySelector("body");
const luz_negra = document.querySelector("#luz_negra");
const searchInput = document.querySelector(".barra_pesquisa input");
const searchButton = document.querySelector("#btn_pesquisa");
const conteudos = document.querySelectorAll(".conteudo");

// Palavras-chave a serem incluídas na pesquisa
const keywords = ["faltas", "calendário", "cardápio", "boletim", "anotações"];

// Função para filtrar os itens
function filterItems() {
  const searchTerm = searchInput.value.toLowerCase();

  conteudos.forEach(conteudo => {
    const title = conteudo.querySelector(".titulo_conteudo h2").textContent.toLowerCase();
    const description = conteudo.querySelector(".desc_conteudo h3").textContent.toLowerCase();

    // Verifica se o título, descrição ou palavras-chave contêm o termo de pesquisa
    const matches = title.includes(searchTerm) || description.includes(searchTerm) || keywords.some(keyword => keyword.includes(searchTerm));

    conteudo.style.display = matches ? "block" : "none"; // Mostra ou esconde o item
  });
}

// Evento de clique no botão de pesquisa
searchButton.addEventListener("click", filterItems);

// Adicionando evento de keyup para pesquisa em tempo real
searchInput.addEventListener("keyup", filterItems);

luz_negra.addEventListener("click", () => {
  body.classList.toggle("escuro");
  if (body.classList.contains("escuro")) {
    luz_negra.classList.replace("bx-sun", "bx-moon");
  } else {
    luz_negra.classList.replace("bx-moon", "bx-sun");
  }
});







/*const barra_lateral = document.querySelector(".barra_lateral");
const submenuItes = document.querySelectorAll(".submenu_item");
const barra_lateralAbrir = document.querySelector("#barra_lateralAbrir");
const barra_lateralfechar = document.querySelector(".collapse_barra_lateral");
const barra_lateralExpandir = document.querySelector(".expand_barra_lateral");
barra_lateralAbrir.addEventListener("click", () => barra_lateral.classList.toggle("fechar"));

barra_lateralfechar.addEventListener("click", () => {
  barra_lateral.classList.add("fechar", "hoverable");
});
barra_lateralExpandir.addEventListener("click", () => {
  barra_lateral.classList.remove("fechar", "hoverable");
});

barra_lateral.addEventListener("mouseenter", () => {
  if (barra_lateral.classList.contains("hoverable")) {
    barra_lateral.classList.remove("fechar");
  }
});
barra_lateral.addEventListener("mouseleave", () => {
  if (barra_lateral.classList.contains("hoverable")) {
    barra_lateral.classList.add("fechar");
  }
});*/


/*submenuItes.forEach((item, index) => {
  item.addEventListener("click", () => {
    item.classList.toggle("show_submenu");
    submenuItes.forEach((item2, index2) => {
      if (index !== index2) {
        item2.classList.remove("show_submenu");
      }
    });
  });
});

if (window.innerWidth < 768) {
  barra_lateral.classList.add("fechar");
} else {
  barra_lateral.classList.remove("fechar");
}*/