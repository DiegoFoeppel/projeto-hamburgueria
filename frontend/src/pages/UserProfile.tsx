import Header from "../components/Header";
import { useAuth } from "../hooks/useAuth";

const UserProfile = () => {
  const { user } = useAuth();

  return (
    <>
      <Header />
      <div className='w-full md:w-[737px] h-full md:h-[86px] mx-auto my-4 py-2  text-bege '>
        <p>Nome: {user?.nome}</p>
        <p>Email: {user?.email}</p>
        <p>Cep: {user?.cep}</p>
      </div>
    </>
  );
};

export default UserProfile;
