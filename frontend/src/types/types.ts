export type User = {
  nome: string;
  email: string;
  cep: string;
  password: string;
};

export interface LoginCredentials {
  email: string;
  password: string;
}

export type Filter = {
  id: number;
  category: string;
};

export type Menu = {
  category: string;
  products: Product[];
};

export type Product = {
  id: number;
  name: string;
  category: string;
  description: string;
  imgUrl: string;
  price: number;
  createdAt?: Date;
};

export type OrderStatus = "Pendente" | "Retirado" | "Cancelado";

export interface Pedido {
  id: number;
  status: OrderStatus;
  client: string;
  date: string; // Formato DD/MM/YYYY
  orderDate: string; // Formato HH:mm
  orderFinishDate?: string; // Formato HH:mm ou null
  total: number;
}
