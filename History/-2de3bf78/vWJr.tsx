import { FC } from "react";
import { IParticipant } from "src/Models/Participant";
import { Row } from "./ParticipantTableRow";

interface TableProps {
  participants: Partial<IParticipant>[];
  onParticpantDelete: (authToken: string) => Promise<void>;
}

export const Table: FC<TableProps> = ({ participants, onParticpantDelete }) => {
  return (
    <table className="min-w-full leading-normal">
      <thead>
        <tr>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Email
          </th>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            id
          </th>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Role
          </th>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider" />
        </tr>
      </thead>
      <tbody>
        {participants.map((participant) => {
          return (
            <Row
              key={participant.participantID}
              participant={participant}
              onDelete={onParticpantDelete}
            />
          );
        })}
      </tbody>
    </table>
  );
};
