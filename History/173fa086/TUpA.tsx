import Fuse from "fuse.js";
import ErrorPage from "next/error";
import { MouseEventHandler, useEffect, useState } from "react";
import { TextInput } from "src/components";
import { AddParticipantButton, RefreshButton } from "src/components/buttons";
import { IParticipant } from "src/Models/Participant";
import { AddChallengeModal } from "src/partials/admin/addChallengeModal";
import { Table } from "src/partials/admin/ParticipantTable";
import { Portal } from "src/utils";

const ParticipantsDashboard = () => {
  const [participants, setParticipants] = useState<Partial<IParticipant>[]>([]);
  const [filteredParticipants, setFilteredParticipants] = useState<
    Partial<IParticipant>[]
  >([]);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [loadingParticipants, setLoadingParticipants] = useState<boolean>(true);
  const [searchPattern, setSearchPattern] = useState<string>("");
  const [fuse, setFuse] = useState<Fuse<any>>();
  const [showAddParticipantModal, setShowAddParticipantModal] =
    useState<boolean>(false);

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

  const handleRefreshParticipants: MouseEventHandler<HTMLButtonElement> = (
    e,
  ) => {
    e.preventDefault();
    fetchParticipants(authToken);
  };

  const handleAddParticipant: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container mx-auto py-4">
      <div className="flex justify-between">
        <span className="flex items-center">
          <h1 className="text-2xl text-cblue pr-4">Participants</h1>
          <RefreshButton handleRefresh={handleRefreshParticipants} />
          <AddParticipantButton handleAddParticipant={handleAddParticipant} />
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
            <>
              <Table
                participants={filteredParticipants}
                onParticpantDelete={fetchParticipants}
              />
              {showAddParticipantModal && (
                <Portal>
                  <div className="absolute h-screen w-screen flex items-center justify-center ">
                    <AddChallengeModal />
                    <div
                      className="bg-black opacity-20 w-screen h-screen absolute z-0"
                      onClick={() => setShowAddParticipantModal(false)}
                    />
                  </div>
                </Portal>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ParticipantsDashboard;
