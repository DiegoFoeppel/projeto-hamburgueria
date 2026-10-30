import { useEffect, useState } from "react";
import { mockPedidos, opcoesPedidos } from "../utils/data";
import ListaPedidos from "../components/Orders/ListaPedidos";
import { useAuth } from "../context/UserContext";
import { getOrdersByUserId } from "../services/ordersService";
import Filtros from "../components/Filtros";

const OrdersPage = () => {
  const [status, setStatus] = useState<string>("");
  const [userOrders, setUserOrders] = useState([]);

  const onSelectFiltro = (selectedStatus: string) => {
    setStatus(status === selectedStatus ? "" : selectedStatus);
  };

  const pedidosFiltrados = status
    ? mockPedidos.filter((p) => p.status === status)
    : mockPedidos;

  const { user } = useAuth();

  const fetchOrders = async () => {
    if (!user) return;

    try {
      const userOrders = await getOrdersByUserId(user?.id);

      setUserOrders(userOrders);
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
      <Filtros
        opcoes={opcoesPedidos}
        onClick={onSelectFiltro}
        filtro={status}
      />

      <ListaPedidos data={userOrders} />
    </div>
  );
};

export default OrdersPage;
