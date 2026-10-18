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
  category: string;
  categoryId: string;
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
  createdAt: string; // Formato HH:mm
  orderFinishDate?: string; // Formato HH:mm ou null
  total: number;
  items: OrderItem[];
}
