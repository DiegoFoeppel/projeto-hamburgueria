import type { Dispatch, SetStateAction } from "react";

export type User = {
  id?: string;
  nome: string;
  email: string;
  cep: string;
  password: string;
};

export type UpdateUser = {
  id?: string;
  nome: string;
  cep: string;
};

export interface LoginCredentials {
  email: string;
  password: string;
}

export type Filter = {
  id: string;
  name: string;
};

export type Menu = {
  id: string;
  name: string;
  sortOrder: number;
  products: Product[];
};

export type OrderItem = {
  id: string;
  orderId: string;
  productId: number;
  quantity: number;
  price: number;
  productName: string;
};

export type Product = {
  id?: number;
  name: string;
  // category: string;
  categoryId: string;
  description: string;
  imgUrl: string;
  price: string;
  createdAt?: Date;
};

export type OrderStatus = "Pendente" | "Retirado" | "Cancelado";

export interface Pedido {
  id: number;
  status: OrderStatus;
  client: string;
  date: string; // Formato DD/MM/YYYY
  createdAt: string; // Formato HH:mm
  orderFinishDate?: string; // Formato HH:mm ou null
  total: number;
  items: OrderItem[];
}

export type FiltroValue = {
  opcoes: Filter[];
  onClick: (value: string) => void;
  filtro: string | null;
};

export type Category = {
  id: string;
  name: string;
  sortOrder: number;
};

export type ModalMode = "edit" | "create";

export type ButtonType = {
  text: string;
  onClick?: () => void;
  variant: "default" | "outline";
  type: "submit" | "reset" | "button" | undefined;
};

export type MenuProps = {
  data: Menu[];
};

export type ProductProps = {
  product: Product;
};

export interface ListaPedidosProps {
  data: Pedido[];
}

export interface PedidoCardProps {
  pedido: Pedido;
  setPedidos: Dispatch<SetStateAction<Pedido[]>>;
  pedidos: Pedido[];
}

export interface PedidoCardProps {
  pedido: Pedido;
  // setPedidos: Dispatch<SetStateAction<Pedido[]>>;
  // pedidos: Pedido[];
  index: number;
}
