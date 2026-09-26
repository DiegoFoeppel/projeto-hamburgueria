import React from "react";

const opcoes = [
  { id: 1, label: "Hamburguer", value: "hamburguer" },
  { id: 2, label: "Bebidas", value: "bebida" },
  { id: 3, label: "Porções", value: "porcao" },
];

const Filtros = () => {
  return (
    <div className='w-full md:w-[737px] mx-auto'>
      {/* <div className='flex gap-3 items-center justify-start'> */}
      <div className='flex gap-3 my-4'>
        {opcoes.map((item) => (
          <button
            className='bg-[#F2DAAC] rounded-[5px] w-[135px] h-[35px] border'
            key={item.id}
          >
            {item.label}
          </button>
        ))}
        {/* </div> */}
      </div>
    </div>
  );
};

export default Filtros;
