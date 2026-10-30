import { useState } from "react";
import Input from "../components/Input";
import { useAuth } from "../context/UserContext";
import Button from "../components/Button";
import { useUpdateUser } from "../hooks/users";

export function ProfileForm() {
  const { user } = useAuth();

  // 1. Só renderiza ou inicializa os estados quando o usuário estiver carregado
  if (!user) {
    return <div>Carregando dados do usuário...</div>; // Ou um esqueleto/spinner
  }

  return <UserProfile user={user} />;
}

const UserProfile = ({ user }) => {
  const [nome, setNome] = useState(user?.nome || "");
  const [cep, setCep] = useState(user?.cep || "");

  const { mutate: update, isPending, error, isSuccess } = useUpdateUser();
  console.log("use", useUpdateUser());

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = {
      id: user.id,
      nome,
      cep,
    };

    if (!data) return;

    update(data);
    // toast.success("Deu certo");
  };

  return (
    <>
      {/* <Header /> */}
      <div className='flex w-full md:w-[737px] h-full md:h-[86px] mx-auto my-4 py-2 justify-center'>
        <form className='flex flex-col' onSubmit={onSubmit}>
          <label htmlFor='name' className='text-white mb-1'>
            Nome
          </label>
          <Input
            value={nome}
            id='name'
            onChange={(e) => setNome(e.target.value)}
          />

          <label htmlFor='email' className='text-white mb-1'>
            Email
          </label>
          <Input disabled value={user?.email} readOnly id='email' />

          <label htmlFor='cep' className='text-white mb-1'>
            Cep
          </label>
          <Input
            type='text'
            value={cep}
            id='cep'
            onChange={(e) => setCep(e.target.value)}
          />

          <div className='mb-2'></div>
          <Button
            type='submit'
            text={isPending ? "Editando..." : "Editar informações"}
            variant='default'
            disabled={isPending}
          />
        </form>
      </div>
    </>
  );
};

export default UserProfile;
