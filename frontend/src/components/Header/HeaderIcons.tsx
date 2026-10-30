import { Link, NavLink, useLocation } from "react-router";
import { useAuth } from "../../context/UserContext";
import { useCart } from "../../hooks/useCart";
import { iconStyle } from "../../utils/data";
import {
  Box,
  ClipboardList,
  LayoutGrid,
  LogOutIcon,
  Plus,
  ShoppingCart,
} from "lucide-react";
import { useProductModal } from "../../stores/productModal";

type HeaderIconsProps = {
  onCart: () => void;
};

export const HeaderIcons = ({ onCart }: HeaderIconsProps) => {
  const { user, logout } = useAuth();

  const { qtdProd } = useCart();

  const location = useLocation();

  const path = location.pathname.split("/")[1];

  const getHeaderStyle = (route: string) => {
    return iconStyle[route === path ? "selected" : "default"];
  };

  const checkLink = (isActive: boolean) => {
    return isActive ? iconStyle.selected : iconStyle.default;
  };

  const isAdmin = user?.role === "ADMIN";

  const openCreate = useProductModal((s) => s.openCreate);

  return (
    <div className='flex flex-row gap-10 items-center'>
      {isAdmin && (
        <div className='flex gap-2'>
          {/* <div className={getHeaderStyle("home")}> */}
          {/* <Link to='/home'>
          </Link> */}
          <NavLink to='/home' className={({ isActive }) => checkLink(isActive)}>
            <Box />
          </NavLink>
          {/* </div> */}
          {/* <div className={getHeaderStyle("pedidos")}> */}
          <NavLink
            to='/pedidos'
            className={({ isActive }) => checkLink(isActive)}
          >
            <LayoutGrid />
          </NavLink>
          {/* </div> */}
          <div className={iconStyle.plus} onClick={openCreate}>
            <Plus />
          </div>
        </div>
      )}

      {user && (
        <>
          <div className='flex gap-4 items-center'>
            <Link to='/pedidos'>
              <ClipboardList color='white' size={24} />
            </Link>

            <div className='relative cursor-pointer' onClick={onCart}>
              <div className='h-5 w-5 absolute rounded-full flex gap-2 justify-center items-center -top-3 -right-3 bg-bege'>
                {qtdProd}
              </div>
              <ShoppingCart size={24} color='white' />
            </div>
          </div>

          <div className='flex gap-2 items-center'>
            <Link to='/profile'>
              <span className='text-white'>{user?.nome}</span>
            </Link>
            <div className='cursor-pointer' onClick={logout}>
              <LogOutIcon size={24} color='white' />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
