import { useEffect, useState } from "react";
import Header from "../components/Header";
import Input from "../components/Input";
import { useAuth } from "../hooks/useAuth";
import { User } from "lucide-react";
import Button from "../components/Button";

const UserProfile = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [cep, setCep] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  const { user } = useAuth();

  const resetForm = () => {
    setEmail("");
    setCep("");
    setName("");
  };

  console.log("user", user);

  useEffect(() => {
    if (user) {
      setName(user.nome);
      setEmail(user.email);
      setCep(user.cep);
    }
  }, [user]);

  return (
    <>
      <Header />
      <div className='flex w-full md:w-[737px] h-full md:h-[86px] mx-auto my-4 py-2 justify-center'>
        <form className='flex flex-col'>
          <label htmlFor='' className='text-white mb-1'>
            Nome
          </label>
          <Input value={name} />

          <label htmlFor='' className='text-white mb-1'>
            Email
          </label>
          <Input disabled value={email} />

          <label htmlFor='' className='text-white mb-1'>
            Cep
          </label>
          <Input type='text' value={cep} />

          <div className='mb-2'></div>
          <Button type='submit' text='Editar informações' variant='default' />
        </form>
      </div>
    </>
  );
};

export default UserProfile;
