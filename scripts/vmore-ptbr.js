// mudar tamanho da descriçao e gradiente
readButton = document.getElementById('product-description');
gradient = document.getElementById('gradient-effect');
isMore = 0;

const toggleText = () => {

  if (isMore == 0) {
    readButton.style.height = '300px';
    isMore = 1;
    gradient.style.display = 'none';
    readButton.style.border = '2px solid #d9e4ee';
  }

  else {
    readButton.style.height = '115px'
    isMore = 0
    readButton.style.border = 'none'

    readButton.addEventListener('transitionend', () => {
      isMore === 0 ? gradient.style.display = 'inline' : 0;
      readButton.removeEventListener('transitionend', handler);
    })
  }

}

// ------------------------------------------------


divBlock = document.getElementById('img');
function changeImg(value) {
  value == 0
    ? img.src = produto.preview.preview1
    : img.src = produto.preview.preview2
    console.log(produto.preview2)
}


// ------------------------------------------------

const abrirModal = (imagem) => {
  document.getElementById("modal").style.display = "flex";
  document.getElementById("imagemModal").src = imagem;
}
const fecharModal = () => document.getElementById("modal").style.display = "none";


// ------------------------------------------------
let produto;

const id = new URLSearchParams(window.location.search).get('id');
console.log("id da url aqui: " + id);
fetch('../vmore-ptbr.json')
  .then(response => response.json())
  .then(products => {
    // Encontrar o produto com o ID correspondente
    produto = products.find(p => p.id === id);

    // Se o produto for encontrado, atualizar o HTML
    if (produto) {
      document.getElementById('product-title').textContent = produto.nome;
      document.getElementById('product-function').textContent = produto.funcao;
      document.getElementById('product-description').textContent = produto.descricao;
      document.getElementById('price-value').textContent = produto.preco;
      document.getElementById('preview').src = produto.preview.preview1;
      document.getElementById('preview1').src = produto.preview.preview2;
      document.getElementById('img').src = produto.imagem;


      const example = document.getElementById('schematic');
      example.setAttribute('onclick', `abrirModal('${produto.imagemExemplo}')`);
    }
  });



  // ------------------------------------------------

let quantity = document.getElementById('real-quantity');
let addCart = document.getElementById('addCart-button');
quantity.innerHTML = 1;
const decreaseValue = () => quantity.innerHTML > 1 ? quantity.innerHTML -= 1 : 0;
const increaseValue = () => quantity.innerHTML++;


document.getElementById('addCart-button').onclick = () => {
  adicionarAoCarrinho(id);
};


function adicionarAoCarrinho(id) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  const qtdProduto = parseInt(document.getElementById('real-quantity').innerText);
  alert(qtdProduto + " items adicionados ao carrinho");
  const produtoExistente = carrinho.find(produto => produto.id === id);

  produtoExistente ? produtoExistente.qtd += qtdProduto
    : carrinho.push({ id: id, qtd: qtdProduto });

  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  // console.log(carrinho);
}

//Coloca o email do usuário no title do icone do usuário

document.addEventListener('DOMContentLoaded', function() {

    let userEmail = localStorage.getItem("userEmail");


    if (userEmail) {
        const classDoIcone = document.querySelector(".current-user");
        if (classDoIcone) {
            classDoIcone.title = userEmail;  
        }
    }
});

// -----------------------

function changeLanguage(language) {
  console.log(language);
  const currentUrl = window.location.href;

  const productId = currentUrl.split('?')[1];
  const baseUrl = language === 'en' ? '../pages/vmore.html' : '../pages/vmore-ptbr.html';

  window.location.href = `${baseUrl}?${productId}`;
  console.log(`deu bom?: ${baseUrl}?${productId}`)
}