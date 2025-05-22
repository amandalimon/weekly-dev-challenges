import { ReactNode } from "react";

interface CardProps {
  title: string;
  description: string;
  children: ReactNode;
}

export const Card = ({ title, description, children }: CardProps) => {
  return (
    <div className="w-full max-w-md bg-zinc-900 text-white rounded-2xl shadow-xl p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-center mb-2">{title}</h1>
        <p className="text-zinc-400 text-center">{description}</p>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
};
