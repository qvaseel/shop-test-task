"use client";
import React from "react";
import Logo from "@/components/ui/Logo/Logo";
import Menu from "@/components/ui/Menu/Menu";
import UserInfo from "@/components/ui/UserInfo/UserInfo";
import useAuth from "@/hooks/useAuth";

const Sidebar = () => {
  const { user } = useAuth();
  return (
    <div className="h-screen w-56 bg-slate-100 flex flex-col">
      <Logo />
      <Menu />
      <div className="fixed bottom-0">
        <UserInfo
          fullName={user?.name}
          roles={
            user?.roles.length === 2
              ? ["Админ", "Пользователь"]
              : ["Пользователь"]
          }
        />
      </div>
    </div>
  );
};

export default Sidebar;
