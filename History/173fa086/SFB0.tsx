import { FC, useEffect, useState } from "react";
import { IParticipant } from "src/Models/Participant";
import Fuse from "fuse.js";
import ErrorPage from "next/error";
import { TextInput } from "src/components";
import { TrashIcon, RefreshIcon } from "@heroicons/react/outline";
import { RefreshButton } from "../../src/components/buttons";

interface RowProps {
  participant: Partial<IParticipant>;
  onDelete: (authToken: string) => Promise<void>;
}
const Row: FC<RowProps> = ({ participant, onDelete }) => {
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

interface TableProps {
  participants: Partial<IParticipant>[];
  onParticpantDelete: (authToken: string) => Promise<void>;
}

const Table: FC<TableProps> = ({ participants, onParticpantDelete }) => {
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
const ParticipantsDashboard = () => {
  const [participants, setParticipants] = useState<Partial<IParticipant>[]>([]);
  const [filteredParticipants, setFilteredParticipants] = useState<
    Partial<IParticipant>[]
  >([]);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [loadingParticipants, setLoadingParticipants] = useState<boolean>(true);
  const [searchPattern, setSearchPattern] = useState<string>("");
  const [fuse, setFuse] = useState<Fuse<any>>();

  const fetchParticipants = async (authToken: string) => {
    const rawParticipants = await fetch("/api/participants", {
      headers: {
        authorization: authToken,
      },
    });
    const res = await rawParticipants.json();
    setParticipants(res);
    setFilteredParticipants(res);

    const fuseInstance = new Fuse(res, {
      keys: ["email", "participantID", "isAdmin"],
    });

    setFuse(fuseInstance);

    setLoadingParticipants(false);
  };

  useEffect(() => {
    const storedAuthToken = window.localStorage.AuthToken;

    if (storedAuthToken) {
      setAuthToken(storedAuthToken);
    }

    fetchParticipants(storedAuthToken);

    return () => {};
  }, []);

  if (!authToken) {
    return <ErrorPage statusCode={401} />;
  }

  const handleRefreshParticipants = (e) => {
    e.preventDefault();
    fetchParticipants(authToken);
  };

  return (
    <div className="container mx-auto py-4">
      <div className="flex justify-between">
        <span className="flex items-center">
          <h1 className="text-2xl text-cblue pr-4">Participants</h1>
          <RefreshButton handleRefresh={handleRefreshParticipants} />
        </span>
        {fuse && (
          <TextInput
            value={searchPattern}
            onChange={(e) => {
              const pattern = e.target.value;
              setSearchPattern(pattern);
              if (pattern.length) {
                const res = fuse.search(pattern);
                const filtered = res.map((r) => r.item);
                setFilteredParticipants(filtered);
              } else {
                setFilteredParticipants(participants);
              }
            }}
            placeholder={"🔎 Search..."}
          />
        )}
      </div>
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
          {loadingParticipants ? (
            <h1>Loading...</h1>
          ) : (
            <Table
              participants={filteredParticipants}
              onParticpantDelete={fetchParticipants}
            />
          )}
          {/*
          <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
            <span className="text-xs xs:text-sm text-gray-900">
              Showing 1 to 4 of 50 Entries
            </span>
            <div className="inline-flex mt-2 xs:mt-0">
              <button className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l">
                Prev
              </button>
              &nbsp; &nbsp;
              <button className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r">
                Next
              </button>
            </div>
          </div>
*/}
        </div>
      </div>
    </div>
  );
};

export default ParticipantsDashboard;
