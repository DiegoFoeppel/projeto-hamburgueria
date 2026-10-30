import type { ListaPedidosProps } from "../../types/types";
import PedidoCard from "./Pedido";

const ListaPedidos = ({ data }: ListaPedidosProps) => {
  return (
    <div className='w-[747px] mx-auto my-4 gap-2'>
      {data.length > 0 ? (
        data.map((p, i) => <PedidoCard pedido={p} key={p.id} index={i} />)
      ) : (
        <p className='text-white'>Nenhum dado ainda</p>
      )}
    </div>
  );
};

export default ListaPedidos;
