import { useState } from "react";
import Produtos from "../components/Products/Produtos";
// import { deleteProduct } from "../services/productsService";
// import type { ModalMode, Product } from "../types/types";
import { useCategoriesQuery } from "../hooks/useCategories";
import { useProductsQuery } from "../hooks/useProducts";
import Filtros from "../components/Filtros";

const HomePage = () => {
  const [filtro, setFiltro] = useState<string | null>(null);
  // const [isOpen, setIsOpen] = useState(false);

  // const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  // const [modalMode, setModalMode] = useState<ModalMode>("create");

  // const handleOpen = () => {
  //   setIsOpen((prev) => !prev);
  // };

  const {
    data: categories = [],
    isLoading: isLoadingCategories,
    error: categoriesError,
  } = useCategoriesQuery();

  const {
    data: menu = [],
    isLoading: isLoadingMenu,
    error: menuError,
  } = useProductsQuery();

  // const handleDelete = async (id: number) => {
  //   try {
  //     if (!id) return;

  //     const response = await deleteProduct(id);

  //     console.log("response", response);

  //     // fetchData();
  //   } catch (err) {
  //     console.log("err", err);
  //   }
  // };

  // const handleSelectedProduct = (id: number) => {};

  const onSelectFiltro = (value: string) => {
    setFiltro(filtro === value ? null : value);
  };

  console.log("filtro", filtro);
  const visible = filtro ? menu.filter((p) => p.id === filtro) : menu;

  // console.log("filtro", visible);

  // const handleEditClick = (id) => {
  //   handleOpen();
  //   const product = menu
  //     .flatMap((group) => group.products)
  //     .find((p) => p.id === id);

  //   if (!product) {
  //     console.log("deu ruim");
  //     return;
  //   }

  //   console.log("product t", product);

  //   // setSelectedProduct(product);
  //   // setModalMode("edit");
  // };

  // const onAdd = () => {
  //   handleOpen();
  //   // setModalMode("create");
  // };

  return (
    <>
      <Filtros opcoes={categories} onClick={onSelectFiltro} filtro={filtro} />
      <Produtos
        data={visible}
        // // onDelete={handleDelete}
        // onEdit={handleEditClick}
      />
    </>
  );
};

{
  /* <CommonSection
        // onOpen={handleOpen}
        onClick={onSelectFiltro}
        opcoes={categories}
        filtro={filtro}
        onAdd={onAdd}
        isOpen={isOpen}
        onOpen={handleOpen}
        onClose={handleOpen}
        mode={modalMode}
        product={selectedProduct}
        // fetchData={fetchData}
        // onClose={() => setIsModalOpen(false)}
      /> */
}

export default HomePage;
