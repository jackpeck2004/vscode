import { FC, MouseEventHandler } from "react";
import { PlainButton } from "./Plain";

interface AddParticiapntButtonProps {
  handleAddParticipant: MouseEventHandler<HTMLButtonElement>;
}

export const AddParticipantButton: FC<AddParticiapntButtonProps> = ({ handleAddParticipant }) => {
  return (
    <PlainButton onClick={handleAddParticipant}>

    </PlainButton>
  )
};
