import { Link, NavLink, useLocation, useNavigate } from "react-router";
import {
  Box,
  CircleUserIcon,
  LayoutGrid,
  LogOutIcon,
  Plus,
  ShoppingCart,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useContext, useState } from "react";
import Cart from "./Cart";
import { useCart } from "../hooks/useCart";

const iconStyle = {
  default:
    "h-9 w-9 flex justify-center items-center border-2 rounded-md border-bege cursor-pointer text-bege bg-black",
  selected:
    "h-9 w-9 flex justify-center items-center border-2 rounded-md border-bege cursor-pointer bg-bege text-black",
  plus: "h-8.75 w-8.75 flex justify-center items-center border-2 rounded-md border-bege cursor-pointer text-bege",
};

const HeaderIcons = ({ onAdd, onCart }) => {
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
          <div className={iconStyle.plus} onClick={onAdd}>
            <Plus />
          </div>
        </div>
      )}

      <div className='relative cursor-pointer' onClick={onCart}>
        <div className='h-5 w-5 absolute rounded-full flex gap-2 justify-center items-center -top-3 -right-3 bg-bege'>
          {qtdProd}
        </div>
        <ShoppingCart size={18} color='white' />
      </div>

      <div className='flex gap-2 items-center'>
        <span className='text-white'>{user?.nome}</span>
        <div className='cursor-pointer' onClick={logout}>
          <LogOutIcon size={18} color='white' />
        </div>
      </div>
    </div>
  );
};

const Header = ({ onOpen, onAdd }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleModal = () => {
    setIsCartOpen((prev) => !prev);
  };

  return (
    <div className='w-full md:w-[737px] h-full md:h-[86px] mx-auto py-2 '>
      <div className='flex justify-between items-center p-3 md:p-0'>
        <Link to='/home'>
          <img src='/logo.png' alt='Logo' />
        </Link>
        <HeaderIcons onAdd={onAdd} onCart={handleModal} />
        {/* )} */}
        {isCartOpen && <Cart onClose={handleModal} />}
        {/* {user && user.role === "USER" && <UserIcons />} */}
        {!user && (
          <Link
            to='/login'
            className='bg-[#F2DAAC] w-[135px] h-[35px] rounded-[5px] flex justify-center items-center'
          >
            Entrar
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;

{
  /* // <div className='flex gap-4'>
  //   <Link to='/profile'>
  //     <CircleUserIcon color='#F2DAAC' />
  //   </Link>
  //   <div className='hover:cursor-pointer'>
  //     <LogOutIcon color='#F2DAAC' onClick={handleLogout} />
  //   </div>
  // </div>
) : (
  <button className='bg-[#F2DAAC] w-[135px] h-[35px] rounded-[5px]'>
    Entrar
  </button>
)} */
}
