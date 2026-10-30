// layouts/MainLayout.tsx
import { Outlet } from "react-router";
import Header from "../components/Header/Header";
import ProductModal from "../components/Products/ProductFormModal";

export function MainLayout() {
  return (
    <>
      <Header />
      <Outlet /> {/* aqui entra a página da rota */}
      <ProductModal />
    </>
  );
}
