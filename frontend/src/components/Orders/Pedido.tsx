import { Calendar, Clock, ClockCheck } from "lucide-react";
import type { OrderStatus, PedidoCardProps } from "../../types/types";
import { useState, type ChangeEvent } from "react";
import { formatPrice } from "../../utils/data";

const PedidoCard = ({ pedido, index, onChangeStatus }: PedidoCardProps) => {
  const [pedidoStatus, setPedidoStatus] = useState<OrderStatus>(pedido.status);

  const changeValue = (e: ChangeEvent<HTMLSelectElement>) => {
    setPedidoStatus(e.target.value as OrderStatus);
    onChangeStatus(pedido, e.target.value);
  };

  const date = new Date(pedido.createdAt).toLocaleString("pt-BR").split(", ");
  console.log("date", date);

  return (
    <div className='flex flex-col justify-between bg-bege rounded-md p-2'>
      <div className='flex justify-between mb-2'>
        <span> Pedido #{index + 1}</span>
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

      <div className='border-2 border-gray-400 p-2 rounded-md'>
        {pedido.items.length &&
          pedido.items.map((p) => (
            <p>
              {p.quantity}x - {p.productName}
            </p>
          ))}
      </div>

      <div className='mb-2'>
        {/* <div className='flex gap-2 items-center'>
          <User size={18} />
          <span>{pedido.client}</span>
        </div> */}

        {/* horario */}

        <div className='flex gap-2 items-center'>
          <Calendar size={18} />
          <span>{date[0]}</span>
        </div>
        {/* horario */}
        <div className='flex gap-2 items-center'>
          <Clock size={18} />
          <span>{date[1]}</span>
        </div>
        <div className='flex gap-2 items-center'>
          <ClockCheck size={18} />
          <span>{pedido.orderFinishDate ?? "--"}</span>
        </div>
      </div>

      <div className='color-bg border ' />

      <span className=''>{formatPrice(pedido.total)}</span>
    </div>
  );
};

export default PedidoCard;
