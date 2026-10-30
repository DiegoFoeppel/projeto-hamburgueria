import { useProductModal } from "../../stores/productModal";
import Modal from "./Modal";
import ProductForm from "./ProductForm";

const ProductFormModal = () => {
  const { modal, close } = useProductModal();
  const product = modal?.product; // undefined = criar

  return (
    <Modal open={!!modal} onClose={close}>
      <ProductForm product={product} onDone={close} />
    </Modal>
  );
};

export default ProductFormModal;
