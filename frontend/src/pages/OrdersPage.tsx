import React, { useState } from "react";
import Header from "../components/Header";
import Filtros from "../components/Filtros";
import Produtos from "../components/Produtos";
import { mockPedidos, opcoesPedidos } from "../utils/data";
import ListaPedidos from "../components/ListaPedidos";
import ProductModal from "../components/ProductModal";
import CommonSection from "../components/CommonSection";

const OrdersPage = () => {
  const [status, setStatus] = useState<string>("");

  const onSelectFiltro = (selectedStatus: string) => {
    setStatus(status === selectedStatus ? "" : selectedStatus);
  };

  const pedidosFiltrados = status
    ? mockPedidos.filter((p) => p.status === status)
    : mockPedidos;

  return (
    <div>
      {/* <Header onOpen={handleOpen} />
      <Filtros
      opcoes={opcoesPedidos}
      onClick={onSelectFiltro}
      filtro={status}
      />
      {isModalOpen && <ProductModal onClose={() => setIsModalOpen(false)} />} */}
      <CommonSection
        // onOpen={handleOpen}
        opcoes={opcoesPedidos}
        filtro={status}
        // isOpen={isModalOpen}
        // onClose={() => setIsModalOpen(false)}
      />

      <ListaPedidos data={pedidosFiltrados} />
    </div>
  );
};

export default OrdersPage;

// const [isModalOpen, setIsModalOpen] = useState(false);

// const handleOpen = () => {
//   console.log("clicoU");
//   setIsModalOpen(true);
// };
