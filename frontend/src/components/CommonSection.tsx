import React, { useState } from "react";
import Header from "./Header";
import Filtros from "./Filtros";
import ProductModal from "./ProductModal";

const CommonSection = ({
  opcoes,
  onClick,
  filtro,
  onAdd,
  isOpen,
  onOpen,
  onClose,
  handleOpen,
  mode,
  product,
  fetchData,
}) => {
  return (
    <div>
      <Header onOpen={handleOpen} onAdd={onAdd} />
      <Filtros opcoes={opcoes} onClick={onClick} filtro={filtro} />
      {isOpen && (
        <ProductModal
          onClose={onClose}
          mode={mode}
          product={product}
          fetchData={fetchData}
        />
      )}
    </div>
  );
};

export default CommonSection;
