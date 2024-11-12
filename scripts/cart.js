function changeQuantity(id, value) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    let produtoCarrinho = carrinho.find(item => item.id === id);

    if (produtoCarrinho) {
        
        fetch('../vmore.json')
            .then(response => response.json())
            .then(products => {
                const produto = products.find(item => item.id === produtoCarrinho.id);
                if (produto) {
                    const preco = parseFloat(produto.preco);

                    
                    produtoCarrinho.qtd += value;
                    if (produtoCarrinho.qtd < 1) produtoCarrinho.qtd = 1;

                    // Atualizar o localStorage com a nova quantidade
                    localStorage.setItem("carrinho", JSON.stringify(carrinho));

                    // Atualizar a quantidade na página
                    const quantity = document.querySelector(`.real-quantity-${id}`);
                    const total = document.querySelector(`.total-item-value-${id}`);
                    quantity.innerText = produtoCarrinho.qtd;

                    // Atualizar o total do item
                    total.innerText = "U$ " + (preco * produtoCarrinho.qtd).toFixed(2);






                    let totalCarrinho = 0;
                    
                    carrinho.forEach(item => {
                        const produto = products.find(prod => prod.id === item.id);
                        if (produto) {
                            totalCarrinho += parseFloat(produto.preco) * item.qtd;
                        }
                    });

                    
                    const finalPrice = document.querySelector('.final-price');
                    finalPrice.innerText = `Valor total: R$ ${totalCarrinho.toFixed(2)}`;
                }
            })
            .catch(error => console.error('Erro ao carregar os produtos para atualizar o total:', error));
    }
}

window.onload = () => {
    const cartContainer = document.getElementById('items');
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    if (carrinho.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    // Carregar dados do JSON para preencher os itens
    fetch('../vmore.json')
        .then(response => response.json())
        .then(products => {
            cartContainer.innerHTML = '';  // Limpar o conteúdo atual

            carrinho.forEach(produtoCarrinho => {
                // Encontrar o produto no JSON usando o ID
                const produto = products.find(item => item.id === produtoCarrinho.id);

                if (produto) {

                    preco = parseFloat(produto.preco)
                    // Criar uma div para cada item no carrinho
                    const itemElement = document.createElement('div');
                    itemElement.classList.add('item');  // Adiciona a classe 'item' a cada produto

                    // Montar o conteúdo HTML usando dados do JSON e localStorage
                    itemElement.innerHTML = `
                    <div class="img-description">
                        <img src="${produto.cartImg}" alt="" id="item-img">
                        <div class="item-description">
                            <div class="desc-title">${produto.nome}</div>
                            <div class="desc-txt">${produto.cartdesc}</div>
                        </div>
                    </div>

                    <div class="item-quantity-box">
                        <div onclick="changeQuantity('${produtoCarrinho.id}', -1)" id="minus">
                            <img src="../icons/minus.svg" alt="">
                        </div>
                        <div class="real-quantity-${produtoCarrinho.id}">${produtoCarrinho.qtd}</div>
                        <div onclick="changeQuantity('${produtoCarrinho.id}', 1)" id="plus">
                            <img src="../icons/plus.svg" alt="">
                        </div>
                    </div>

                    <div id="item-value">U$ ${produto.preco}</div>
                    <div class="total-item-value-${produtoCarrinho.id}">U$ ${(preco * produtoCarrinho.qtd).toFixed(2)}</div>
                    <div class="trash-bin">
                        <img onclick="removeItem('${produtoCarrinho.id}')" src="../icons/trash-bin.svg" alt="trash" class="trash">
                    </div>
                    `;


                    let totalCarrinho = 0;
                    
                    carrinho.forEach(item => {
                        const produto = products.find(prod => prod.id === item.id);
                        if (produto) {
                            totalCarrinho += parseFloat(produto.preco) * item.qtd;
                        }
                    });

                    
                    const finalPrice = document.querySelector('.final-price');
                    finalPrice.innerText = `Valor total: R$ ${totalCarrinho.toFixed(2)}`;

                    // Inserir o item no contêiner do carrinho
                    cartContainer.appendChild(itemElement);
                }
            });
        })
        .catch(error => console.error('Erro ao carregar os produtos:', error));
};

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


function removeItem(id) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    carrinho = carrinho.filter(item => item.id !== id);

    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    location.reload();
}