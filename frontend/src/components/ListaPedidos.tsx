import { Calendar, Clock, ClockCheck, Hourglass, User } from "lucide-react";
import type { Pedido, StatusPedido } from "../types/types";
import {
  useState,
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
} from "react";
import { mockPedidos } from "../utils/data";

interface ListaPedidosProps {
  data: Pedido[];
}

interface PedidoCardProps {
  pedido: Pedido;
  setPedidos: Dispatch<SetStateAction<Pedido[]>>;
  pedidos: Pedido[];
}

const PedidoCard = ({
  pedido,
  setPedidos,
  pedidos,
  onChangeStatus,
}: PedidoCardProps) => {
  const [pedidoStatus, setPedidoStatus] = useState<StatusPedido>(pedido.status);

  const changeValue = (e: ChangeEvent<HTMLSelectElement>) => {
    setPedidoStatus(e.target.value as StatusPedido);
    onChangeStatus(pedido, e.target.value);
  };

  return (
    <div className='flex flex-col justify-between bg-bege rounded-md p-2'>
      <div className='flex justify-between mb-2'>
        <span>#{pedido.id}</span>
        {/* <label for='frutas'>Escolha uma fruta:</label> */}
        <select
          id='status'
          name='status'
          value={pedidoStatus}
          onChange={changeValue}
        >
          <option value='Pendente'>Pendente</option>
          <option value='Retirado'>Retirado</option>
          <option value='Cancelado'>Cancelado</option>
        </select>
      </div>

      <div className='mb-2'>
        <div className='flex gap-2 items-center'>
          <User size={18} />
          <span>{pedido.client}</span>
        </div>
        <div className='flex gap-2 items-center'>
          <Calendar size={18} />
          <span>{pedido.date}</span>
        </div>
        <div className='flex gap-2 items-center'>
          <Clock size={18} />
          <span>{pedido.orderDate}</span>
        </div>
        <div className='flex gap-2 items-center'>
          <ClockCheck size={18} />
          <span>{pedido.orderFinishDate ?? "--"}</span>
        </div>
      </div>

      <div className='color-bg border ' />

      <div className='flex justify-end'>
        <span className=''>{pedido.total}</span>
      </div>
    </div>
  );
};

const ListaPedidos = ({ data }: ListaPedidosProps) => {
  const [pedidos, setPedidos] = useState<Pedido[]>(mockPedidos);

  console.log("pedidos", pedidos);

  const onUpdatePedidos = (pedido, pedidoStatus) => {
    setPedidos((prev) =>
      prev.map((p) =>
        p.id === pedido.id ? { ...p, status: pedidoStatus } : p,
      ),
    );
  };

  console.log("pedidos", pedidos);

  return (
    <div className='w-[747px] mx-auto my-10 grid grid-cols-3 gap-2'>
      {pedidos.map((p) => (
        <PedidoCard pedido={p} onChangeStatus={onUpdatePedidos} />
      ))}
    </div>
  );
};

export default ListaPedidos;
