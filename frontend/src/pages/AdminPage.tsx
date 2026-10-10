import React, { useState } from "react";
import Header from "../components/Header";
import Filtros from "../components/Filtros";
import Produtos from "../components/Produtos";
import { mockPedidos, opcoesPedidos } from "../utils/data";
import ListaPedidos from "../components/ListaPedidos";

const AdminPage = () => {
  const [status, setStatus] = useState<string>("");

  const onSelectFiltro = (selectedStatus: string) => {
    setStatus(status === selectedStatus ? "" : selectedStatus);
  };

  const pedidosFiltrados = status
    ? mockPedidos.filter((p) => p.status === status)
    : mockPedidos;

  return (
    <div>
      <Header />
      <Filtros opcoes={opcoesPedidos} />
      <ListaPedidos data={pedidosFiltrados} />
    </div>
  );
};

export default AdminPage;
