const Header = () => {
  return (
    <div className='w-full md:w-[737px] h-full md:h-[86px] mx-auto py-2 border-red-700 border-2'>
      <div className='flex justify-between items-center p-3 md:p-0'>
        <div>
          <img src='../public/logo.png' alt='Logo' />
        </div>
        <button className='bg-[#F2DAAC] w-[135px] h-[35px] rounded-[5px]'>
          Entrar
        </button>
      </div>
    </div>
  );
};

export default Header;
