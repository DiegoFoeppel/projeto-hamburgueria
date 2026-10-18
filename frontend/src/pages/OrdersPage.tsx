import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Filtros from "../components/Filtros";
import Produtos from "../components/Produtos";
import { mockPedidos, opcoesPedidos } from "../utils/data";
import ListaPedidos from "../components/ListaPedidos";
import ProductModal from "../components/ProductModal";
import CommonSection from "../components/CommonSection";
import { api } from "../api/axios";
import { useAuth } from "../hooks/useAuth";

const OrdersPage = () => {
  const [status, setStatus] = useState<string>("");
  const [userOrders, setUserOrders] = useState([]);

  const onSelectFiltro = (selectedStatus: string) => {
    setStatus(status === selectedStatus ? "" : selectedStatus);
  };

  const pedidosFiltrados = status
    ? mockPedidos.filter((p) => p.status === status)
    : mockPedidos;

  const token = localStorage.getItem("jwt");

  const { user } = useAuth();

  const fetchOrders = async () => {
    try {
      const response = await api.get(
        `http://localhost:3000/api/orders/user/${user?.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log("response 2", response);

      setUserOrders(response.data.orders);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

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

      <ListaPedidos data={userOrders} />
    </div>
  );
};

export default OrdersPage;
