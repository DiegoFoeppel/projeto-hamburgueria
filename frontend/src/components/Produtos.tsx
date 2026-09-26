import React from "react";

const menu = [
  {
    id: 1,
    categoria: "BURGERS",
    produtos: [
      {
        id: 61361,
        title: "DUPLO DA CASA",
        description:
          "Dois suculentos hambúrgueres de 120g, queijo cheddar derretido, maionese da casa e picles no pão brioche tostado.",
        src: "/duplo-da-casa.png",
        price: 28.9,
      },
      {
        id: 25116,
        title: "CALABRESA ESPECIAL",
        description:
          "Hambúrguer de carne bovina coberto com linguiça calabresa fatiada, cebola caramelizada e muçarela derretida.",
        src: "/calabresa-especial.png",
        price: 34.9,
      },
      {
        id: 412412,
        title: "SMASH TRIPLO",
        description:
          "Três finas e crostantes carnes amassadas na chapa, com queijo cheddar, cebola roxa e molho especial no pão de batata.",
        src: "/smash-triplo.png",
        price: 34.9,
      },
    ],
  },

  {
    id: 2,
    categoria: "BEBIDAS",
    produtos: [
      {
        id: 412413,
        title: "VITAMINA DE MORANGO",
        description:
          "Cremosa mistura de morangos frescos, leite gelado e um toque de baunilha, batida na hora para uma textura perfeita.",
        src: "/vitamina.png",
        price: 18.9,
      },
      {
        id: 3412421,
        title: "SUCO DE LARANJA",
        description:
          "Laranjas frescas espremidas na hora, servido gelado para manter o sabor cítrico e natural da fruta.",
        src: "/suco-laranja.png",
        price: 14.9,
      },
      {
        id: 1421341,
        title: "COCA COLA",
        description:
          "O clássico refrigerante gelado, com seu sabor único e irresistível, direto da garrafa para manter toda a efervescência.",
        src: "/coca-cola.png",
        price: 7.9,
      },
    ],
  },

  {
    id: 3,
    categoria: "PORÇÕES",
    produtos: [
      {
        id: 412414,
        title: "BATATA FRITA",
        description:
          "Palitos dourados e crocantes, salpicados com sal marinho e servidos piping hot como acompanhamento perfeito.",
        src: "/batata-frita.png",
        price: 34.9,
      },
      {
        id: 52141,
        title: "BATATA CANOA",
        description:
          "Fatias de batata assadas com casca, crocantes por fora e macias por dentro, temperadas com alecrim e sal grosso.",
        src: "/batata-canoa.png",
        price: 36.9,
      },
      {
        id: 4513,
        title: "CALABRESA PICANTE",
        description:
          "Fatias da linguiça calabresa acebolada, finalizada com uma generosa porção de pimenta jalapeño e queijo coalho derretido.",
        src: "/calabresa-picante.png",
        price: 23.9,
      },
    ],
  },
];

const Produtos = () => {
  return (
    <div className='w-[747px] mx-auto my-10 '>
      {menu.map(
        (cat) => (
          // produto.produtos.map((produto) => {
          <div>
            <h2 className='text-[#F2DAAC] mb-2'>{cat.categoria}</h2>
            {cat.produtos.map((produto) => (
              <div className='flex gap-2 my-4'>
                <div>
                  <img src={produto.src} alt='Imagem' />
                </div>
                <div className='flex flex-col justify-between  w-full'>
                  <div>
                    <h3 className='text-title'>{produto.title}</h3>
                    <span className='text-description'>
                      {produto.description}
                    </span>
                  </div>
                  <div className='text-end'>
                    <span className='text-bege'>
                      {produto.price.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ),
        // }),
      )}
    </div>
  );
};

export default Produtos;
