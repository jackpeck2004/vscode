import { FC, MouseEventHandler } from "react";
import { PlainButton } from "./Plain";

interface AddParticiapntButtonProps {
  handleAddParticipant: MouseEventHandler<HTMLButtonElement>;
}

export const AddParticipantButton: FC<AddParticiapntButtonProps> = ({ handleAddParticipant }) => {
  return (
    <PlainButton onClick={handleAddParticipant}>
      <RefreshIcon className="h-4 w-4 text-cblue" />
    </PlainButton>
  )
};
