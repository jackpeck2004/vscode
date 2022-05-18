import { FC } from "react";
import { PlainButton } from "./"

interface AddParticiapntButtonProps {
  handleAddParticipant: (e: MouseEvent) => void;
}

export const AddParticipantButton: FC<AddParticiapntButtonProps> = ({ handleAddParticipant }) => {
  return (
    <PlainButton>

    </PlainButton>
  )
};
