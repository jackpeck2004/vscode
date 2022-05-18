import { RefreshIcon } from "@heroicons/react/outline";
import { FC, MouseEventHandler } from "react";
import { PlainButton } from "./Plain";

interface RefreshButtonProps {
  handleRefresh: MouseEventHandler<HTMLButtonElement>;
}

export const RefreshButton: FC<RefreshButtonProps> = ({ handleRefresh }) => {
  return (
    <PlainButton onClick={handleRefresh}>
      <RefreshIcon className="h-4 w-4 text-cblue" />
    </PlainButton>
  );
};
