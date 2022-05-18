import { useState } from "react";
import { CTAButton, TextInput } from "src/components";
import { pushError, pushMessage } from "src/utils";
import { AddParticipantForm } from "./addParticipantForm";

export const AddParticipantModal = () => {
  return (
    <div className="bg-white w-2/6 py-6 px-6 z-10 rounded-xl">
      <div className="w-1/2 mx-auto">
        <AddParticipantForm />
      </div>
    </div>
  );
};
