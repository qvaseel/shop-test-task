"use client"
import { useState, FormEvent } from "react";
import axios from 'axios';
import { useAuthStore } from '@/store/store';
import Input from "../../ui/Input/Input";
import Button from "../../ui/Button/Button";
import { useRouter } from "next/navigation";
import { api_url } from "@/helpers/url";

const Form = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setUser = useAuthStore((state) => state.setUser);
  const setToken = useAuthStore((state) => state.setToken);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${api_url}/login`, { email, password });
      setUser(response.data.user);
      setToken(response.data.token);
      localStorage.setItem('token', response.data.token);
      router.push('/products');
    } catch (error) {
      alert('Ошибка. Неверный логин или пароль')
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-200 px-8 py-7 rounded-[10px] shadow-md w-[360px] flex flex-col gap-10"
    >
      <h2 className="text-2xl font-medium text-center text-zinc-900">Авторизация</h2>
      <div className="flex flex-col gap-9 pt-8 pb-[10px]">
        <Input required label="Почта" type="email" value={email} id="email" placeholder="Почта" onChange={(e) => setEmail(e.target.value)}/>
        <Input required label="Пароль" type="password" value={password} id="password" placeholder="Пароль" onChange={(e) => setPassword(e.target.value)}/>
      </div>
      <div className="block mx-auto">
        <Button type="submit">Войти</Button>
      </div>
    </form>
  );
};

export default Form;
