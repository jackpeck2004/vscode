import { TrashIcon } from "@heroicons/react/outline";
import { FC, useState } from "react";
import { IParticipant } from "src/Models/Participant";

interface RowProps {
  participant: Partial<IParticipant>;
  onDelete: (authToken: string) => Promise<void>;
}

export const Row: FC<RowProps> = ({ participant, onDelete }) => {
  const [del, setDel] = useState<boolean>(false);
  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{participant.email}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {participant.participantID}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {participant.isAdmin ? (
          <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
            <span
              aria-hidden
              className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
            />
            <span className="relative">Admin</span>
          </span>
        ) : (
          <span className="relative inline-block px-3 py-1 font-semibold text-orange-900 leading-tight">
            <span
              aria-hidden
              className="absolute inset-0 bg-orange-200 opacity-50 rounded-full"
            />
            <span className="relative">Standard</span>
          </span>
        )}
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="w-24 h-16">
          {del ? (
            <div className={"flex items-center"}>
              <button
                className="b-none bg-red-500 text-lg"
                onClick={() => {
                  fetch(
                    `/api/participants/delete/${participant.participantID}`,
                    {
                      method: "DELETE",
                      headers: {
                        authorization: localStorage.AuthToken,
                      },
                    },
                  )
                    .then((res) => res.json())
                    .then((res) => {
                      console.log(res);
                      onDelete(localStorage.AuthToken);
                    });
                }}
              >
                confirm
              </button>
              <span
                className="ml-4 cursor-pointer"
                onClick={() => setDel(false)}
              >
                no
              </span>
            </div>
          ) : (
            <button
              className="b-none bg-transparent text-2xl w-30 h-16"
              onClick={() => setDel(!del)}
            >
              <TrashIcon className="h-8 w-8 text-gray-400 hover:text-red-500 transition" />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};
