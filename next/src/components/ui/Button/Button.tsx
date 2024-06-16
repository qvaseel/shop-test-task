import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}

const Button = ({ variant = "primary", children, ...props }: ButtonProps) => {
  const getButtonStyle = (variant: string) => {
    switch (variant) {
      case "primary":
        return "bg-slate-300 text-zinc-900 hover:bg-slate-400";
      case "secondary":
        return "bg-neutral-700 text-neutral-200 hover:bg-neutral-600";
      default:
        return "";
    }
  };

  return (
    <button
      className={`px-6 py-2 rounded-md font-medium text-base transition duration-200 ${getButtonStyle(
        variant
      )}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
