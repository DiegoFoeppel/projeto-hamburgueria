export const opcoesCategorias = [
  { id: 1, label: "Hamburguer", value: "hamburguers" },
  { id: 2, label: "Bebidas", value: "bebidas" },
  { id: 3, label: "Porções", value: "porcoes" },
];

export const opcoesPedidos = [
  { id: 1, category: "Pendentes" },
  { id: 2, category: "Retirados" },
  { id: 3, category: "Cancelados" },
];

export const menu = [
  {
    id: 1,
    categoria: "BURGERS",
    value: "hamburguers",
    produtos: [
      {
        id: 61361,
        name: "DUPLO DA CASA",
        description:
          "Dois suculentos hambúrgueres de 120g, queijo cheddar derretido, maionese da casa e picles no pão brioche tostado.",
        imgUrl: "/duplo-da-casa.png",
        price: 28.9,
      },
      {
        id: 25116,
        name: "CALABRESA ESPECIAL",
        description:
          "Hambúrguer de carne bovina coberto com linguiça calabresa fatiada, cebola caramelizada e muçarela derretida.",
        imgUrl: "/calabresa-especial.png",
        price: 34.9,
      },
      {
        id: 412412,
        name: "SMASH TRIPLO",
        description:
          "Três finas e crostantes carnes amassadas na chapa, com queijo cheddar, cebola roxa e molho especial no pão de batata.",
        imgUrl: "/smash-triplo.png",
        price: 34.9,
      },
    ],
  },
  {
    id: 2,
    categoria: "BEBIDAS",
    value: "bebidas",
    produtos: [
      {
        id: 412413,
        name: "VITAMINA DE MORANGO",
        description:
          "Cremosa mistura de morangos frescos, leite gelado e um toque de baunilha, batida na hora para uma textura perfeita.",
        imgUrl: "/vitamina.png",
        price: 18.9,
      },
      {
        id: 3412421,
        name: "SUCO DE LARANJA",
        description:
          "Laranjas frescas espremidas na hora, servido gelado para manter o sabor cítrico e natural da fruta.",
        imgUrl: "/suco-laranja.png",
        price: 14.9,
      },
      {
        id: 1421341,
        name: "COCA COLA",
        description:
          "O clássico refrigerante gelado, com seu sabor único e irresistível, direto da garrafa para manter toda a efervescência.",
        imgUrl: "/coca-cola.png",
        price: 7.9,
      },
    ],
  },
  {
    id: 3,
    categoria: "PORÇÕES",
    value: "porcoes",
    produtos: [
      {
        id: 412414,
        name: "BATATA FRITA",
        description:
          "Palitos dourados e crocantes, salpicados com sal marinho e servidos piping hot como acompanhamento perfeito.",
        imgUrl: "/batata-frita.png",
        price: 34.9,
      },
      {
        id: 52141,
        name: "BATATA CANOA",
        description:
          "Fatias de batata assadas com casca, crocantes por fora e macias por dentro, temperadas com alecrim e sal grosso.",
        imgUrl: "/batata-canoa.png",
        price: 36.9,
      },
      {
        id: 4513,
        name: "CALABRESA PICANTE",
        description:
          "Fatias da linguiça calabresa acebolada, finalizada com uma generosa porção de pimenta jalapeño e queijo coalho derretido.",
        imgUrl: "/calabresa-picante.png",
        price: 23.9,
      },
    ],
  },
];

import type { Pedido } from "../types/types";

export const mockPedidos: Pedido[] = [
  {
    id: 1,
    status: "Pendente",
    client: "Odair Michael Bendotti",
    date: "02/10/2025",
    orderDate: "14:55",
    orderFinishDate: undefined,
    total: 157.48,
  },
  {
    id: 2,
    status: "Retirado",
    client: "Odair Michael Bendotti",
    date: "02/10/2025",
    orderDate: "14:55",
    orderFinishDate: "15:15",
    total: 157.48,
  },
  {
    id: 3,
    status: "Cancelado",
    client: "Odair Michael Bendotti",
    date: "02/10/2025",
    orderDate: "14:55",
    orderFinishDate: undefined,
    total: 157.48,
  },
  {
    id: 4,
    status: "Pendente",
    client: "Ana Silva",
    date: "02/10/2025",
    orderDate: "15:02",
    orderFinishDate: undefined,
    total: 89.9,
  },
  {
    id: 5,
    status: "Retirado",
    client: "Carlos Eduardo",
    date: "02/10/2025",
    orderDate: "14:20",
    orderFinishDate: "14:45",
    total: 210.5,
  },
];

export const menu2 = [
  {
    id: 1,
    categoria: "BURGERS",
    value: "hamburguers",
    produtos: [
      {
        name: "DUPLO DA CASA",
        categoria: "Burgers",
        description:
          "Dois suculentos hambúrgueres de 120g, queijo cheddar derretido, maionese da casa e picles no pão brioche tostado.",
        imgUrl: "/duplo-da-casa.png",
        price: 28.9,
      },
      {
        name: "CALABRESA ESPECIAL",
        category: "Burgers",
        description:
          "Hambúrguer de carne bovina coberto com linguiça calabresa fatiada, cebola caramelizada e muçarela derretida.",
        imgUrl: "/calabresa-especial.png",
        price: 34.9,
      },
      {
        name: "SMASH TRIPLO",
        category: "Burgers",
        description:
          "Três finas e crostantes carnes amassadas na chapa, com queijo cheddar, cebola roxa e molho especial no pão de batata.",
        imgUrl: "/smash-triplo.png",
        price: 34.9,
      },
    ],
  },
  {
    id: 2,
    categoria: "BEBIDAS",
    value: "bebidas",
    produtos: [
      {
        name: "VITAMINA DE MORANGO",
        category: "Bebidas",
        description:
          "Cremosa mistura de morangos frescos, leite gelado e um toque de baunilha, batida na hora para uma textura perfeita.",
        imgUrl: "/vitamina.png",
        price: 18.9,
      },
      {
        name: "SUCO DE LARANJA",
        category: "Bebidas",
        description:
          "Laranjas frescas espremidas na hora, servido gelado para manter o sabor cítrico e natural da fruta.",
        imgUrl: "/suco-laranja.png",
        price: 14.9,
      },
      {
        name: "COCA COLA",
        category: "Bebidas",
        description:
          "O clássico refrigerante gelado, com seu sabor único e irresistível, direto da garrafa para manter toda a efervescência.",
        imgUrl: "/coca-cola.png",
        price: 7.9,
      },
    ],
  },
  {
    id: 3,
    categoria: "PORÇÕES",
    value: "porcoes",
    produtos: [
      {
        name: "BATATA FRITA",
        categoria: "Porções",
        description:
          "Palitos dourados e crocantes, salpicados com sal marinho e servidos piping hot como acompanhamento perfeito.",
        imgUrl: "/batata-frita.png",
        price: 34.9,
      },
      {
        name: "BATATA CANOA",
        category: "Porções",
        description:
          "Fatias de batata assadas com casca, crocantes por fora e macias por dentro, temperadas com alecrim e sal grosso.",
        imgUrl: "/batata-canoa.png",
        price: 36.9,
      },
      {
        name: "CALABRESA PICANTE",
        category: "Porções",
        description:
          "Fatias da linguiça calabresa acebolada, finalizada com uma generosa porção de pimenta jalapeño e queijo coalho derretido.",
        imgUrl: "/calabresa-picante.png",
        price: 23.9,
      },
    ],
  },
];

const date = menu2.flatMap((i) => i.produtos);

const teste = [
  {
    id: 5,
    name: "DUPLO DA CASA",
    description:
      "Dois suculentos hambúrgueres de 120g, queijo cheddar derretido, maionese da casa e picles no pão brioche tostado.",
    price: "28.9",
    category: "Burgers",
    imgUrl: "/duplo-da-casa.png",
    createdAt: "2026-10-10T15:19:47.613Z",
  },
  {
    id: 6,
    name: "CALABRESA ESPECIAL",
    description:
      "Hambúrguer de carne bovina coberto com linguiça calabresa fatiada, cebola caramelizada e muçareladerretida.",
    price: "34.9",
    category: "Burgers",
    imgUrl: "/calabresa-especial.png",
    createdAt: "2026-10-10T15:19:47.613Z",
  },
  {
    id: 7,
    name: "SMASH TRIPLO",
    description:
      "Três finas e crostantes carnes amassadas na chapa, com queijo cheddar, cebola roxa e molho especial no pão de batata.",
    price: "34.9",
    category: "Burgers",
    imgUrl: "/smash-triplo.png",
    createdAt: "2026-10-10T15:19:47.613Z",
  },
  {
    id: 8,
    name: "VITAMINA DE MORANGO",
    description:
      "Cremosa mistura de morangos frescos, leite gelado e um toque de baunilha, batida na hora para uma textura perfeita.",
    price: "18.9",
    category: "Bebidas",
    imgUrl: "/vitamina.png",
    createdAt: "2026-10-10T15:19:47.613Z",
  },
  {
    id: 9,
    name: "SUCO DE LARANJA",
    description:
      "Laranjas frescas espremidas na hora, servido gelado para manter o sabor cítrico e natural da fruta.",
    price: "14.9",
    category: "Bebidas",
    imgUrl: "/suco-laranja.png",
    createdAt: "2026-10-10T15:19:47.613Z",
  },
  {
    id: 10,
    name: "COCA COLA",
    description:
      "Oclássico refrigerante gelado, com seu sabor único e irresistível, direto da garrafa para mantertoda a efervescência.",
    price: "7.9",
    category: "Bebidas",
    imgUrl: "/coca-cola.png",
    createdAt: "2026-10-10T15:19:47.613Z",
  },
  {
    id: 11,
    name: "BATATA FRITA",
    description:
      "Palitos dourados e crocantes, salpicados com sal marinho e servidos piping hot como acompanhamento perfeito.",
    price: "34.9",
    category: "Porções",
    imgUrl: "/batata-frita.png",
    createdAt: "2026-10-10T15:19:47.613Z",
  },
  {
    id: 12,
    name: "BATATA CANOA",
    description:
      "Fatias de batata assadas com casca, crocantes porfora e macias por dentro, temperadas com alecrim e sal grosso.",
    price: "36.9",
    category: "Porções",
    imgUrl: "/batata-canoa.png",
    createdAt: "2026-10-10T15:19:47.613Z",
  },
  {
    id: 13,
    name: "CALABRESA PICANTE",
    description:
      "Fatias da linguiça calabresa acebolada, finalizada com uma generosa porção de pimenta jalapeño e queijo coalho derretido.",
    price: "23.9",
    category: "Porções",
    imgUrl: "/calabresa-picante.png",
    createdAt: "2026-10-10T15:19:47.613Z",
  },
];

// const teste2 = teste.reduce((acc, curr, i) => {
//   console.log("curr", acc, curr);
//   if (!acc.category) {
//     return (acc.category = curr.category);
//   }
//   // if (!acc[curr.category]) {
//   //   acc = curr.category;
//   // }
// }, []);

const groups = Object.groupBy(teste, (obj) => obj.category);

// console.log("teste 2", groups);
console.log(Object.entries(groups));

const agrupados = Object.entries(groups).map(([category, products]) => ({
  category,
  products,
}));
console.log("teste 2", agrupados);
