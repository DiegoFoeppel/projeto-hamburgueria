import type { Filter } from "../types/types";

type FiltroValue = {
  opcoes: Filter[];
  onClick: (value: string) => void;
  filtro: string | null;
};

const style = {
  selected:
    "cursor-pointer bg-[#F2DAAC] text-black rounded-[5px] w-[135px] h-[35px] border",
  default:
    "cursor-pointer bg-bg text-bege rounded-[5px] w-[135px] h-[35px] border",
};

const Filtros = ({ opcoes, onClick, filtro }: FiltroValue) => {
  return (
    <div className='w-full md:w-[737px] mx-auto'>
      {/* <div className='flex gap-3 items-center justify-start'> */}
      <div className='flex gap-3 my-4'>
        {opcoes.map((item: Filter) => (
          <button
            className={item.id === filtro ? style.selected : style.default}
            key={item.id}
            onClick={() => onClick(item.id)}
          >
            {item.name}
          </button>
        ))}
        {/* </div> */}
      </div>
    </div>
  );
};

export default Filtros;
