import type { Filter, FiltroValue } from "../types/types";
import { filterBtnStyle } from "../utils/data";

const Filtros = ({ opcoes, onClick, filtro }: FiltroValue) => {
  return (
    <div className='w-full md:w-[737px] mx-auto'>
      <div className='flex gap-3 my-6'>
        {opcoes.map((item: Filter) => (
          <button
            className={
              item.id === filtro
                ? filterBtnStyle.selected
                : filterBtnStyle.default
            }
            key={item.id}
            onClick={() => onClick(item.id)}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Filtros;
