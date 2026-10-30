import { Link } from "react-router";
import { useAuth } from "../../context/UserContext";
import Cart from "../Cart/Cart";
import { useState } from "react";
import { HeaderIcons } from "./HeaderIcons";

const Header = () => {
  const { user, isLoading } = useAuth();

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

        <HeaderIcons onCart={handleModal} />

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
