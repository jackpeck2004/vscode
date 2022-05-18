import { FC, ReactNode } from "react";
interface PlainButtonProps {
  children: ReactNode;
  onClick: (e: MouseEvent) => void;
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
