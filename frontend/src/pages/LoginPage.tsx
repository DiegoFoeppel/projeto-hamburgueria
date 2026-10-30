import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/UserContext";
import type { LoginCredentials } from "../types/types";
import { loginUser } from "../services/authService";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    let user: LoginCredentials = {
      email,
      password,
    };

    try {
      if (!user) return;

      const response = await loginUser(user);

      console.log("response", response);

      if (response.status === 200) {
        login(response.data);
        navigate("/home", { replace: true });
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <form
        className='h-[267px] w-[350px] flex flex-col'
        onSubmit={handleSubmit}
      >
        <div className='mx-auto mb-4'>
          <img src='/logo.png' alt='Logo' />
        </div>

        <Input
          placeholder='E-mail'
          type='email'
          id='email'
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          required
        />
        <Input
          placeholder='Senha'
          type='password'
          id='password'
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          required
          min='3'
        />

        <div className='flex flex-col mt-4'>
          <Button variant='default' type='submit' text='Entrar' />
          <Link to='/register'>
            <Button variant='outline' text='Não possuo conta' type='button' />
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
