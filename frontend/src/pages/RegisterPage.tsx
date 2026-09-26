import Input from "../components/Input";
import Button from "../components/Button";
import { Link, Navigate, useNavigate } from "react-router";

const RegisterPage = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/login", { replace: true });
  };

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='h-[389px] w-[350px] mx-auto border border-red-500 '>
        <img className='mx-auto mb-4' src='../public/logo.png' alt='logo' />
        <Input placeholder='Nome completo' type='text' />
        <Input placeholder='E-mail' type='email' />
        <Input placeholder='Senha' type='password' />
        <Input placeholder='Confirme a senha' type='password' />
        <Input placeholder='CEP' type='text' />

        <div className='flex flex-col mt-4'>
          <Button variant='default' text='Criar conta' type='submit' />
          <Link to='/login'>
            <Button variant='default' text='Já possuo conta' type='button' />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
