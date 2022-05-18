import { FC, MouseEventHandler, ReactNode } from "react";

interface PlainButtonProps {
  children: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const PlainButton: FC<PlainButtonProps> = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-transparent transform hover:rotate-180 transition"
    >
      {children}
    </button>
  );
};
