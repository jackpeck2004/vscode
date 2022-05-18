import { RefreshIcon } from "@heroicons/react/outline";
import { FC, MouseEventHandler } from "react";

interface RefreshButtonProps {
  handleRefresh: MouseEventHandler<HTMLButtonElement>;
}

export const RefreshButton: FC<RefreshButtonProps> = ({ handleRefresh }) => {
  return (
    <button
      onClick={(e) => handleRefresh(e)}
      className="bg-transparent transform hover:rotate-180 transition"
    >
      <RefreshIcon className="h-4 w-4 text-cblue" />
    </button>
  );
};
