import Input from "../components/Input";
import Button from "../components/Button";
import { Link, Navigate, useNavigate } from "react-router";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { createUser } from "../services/usersService";
import type { User } from "../types/types";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [cep, setCep] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const clearFields = () => {
    setEmail("");
    setCep("");
    setNome("");
    setPassword("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!email || !nome || !cep || !password || !confirmPassword) {
      return;
    }

    if (password !== confirmPassword) {
      return;
    }

    const data: User = {
      email,
      nome,
      cep,
      password,
    };

    try {
      const response = await createUser(data);
      console.log("user", response.data);

      clearFields();
    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <form onSubmit={handleSubmit} className='h-[389px] w-[350px] mx-auto   '>
        <img className='mx-auto mb-4' src='/logo.png' alt='logo' />
        <Input
          placeholder='Nome completo'
          type='text'
          value={nome}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setNome(e.target.value)
          }
          required
        />
        <Input
          placeholder='E-mail'
          type='email'
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          required
        />
        <Input
          placeholder='Senha'
          type='password'
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          required
        />
        <Input
          placeholder='Confirme a senha'
          type='password'
          value={confirmPassword}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setConfirmPassword(e.target.value)
          }
          required
        />
        <Input
          placeholder='CEP'
          type='text'
          value={cep}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setCep(e.target.value)
          }
        />
        <div className='flex flex-col mt-4'>
          <Button variant='default' text='Criar conta' type='submit' />
          <Link to='/login'>
            <Button variant='outline' text='Já possuo conta' type='button' />
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
