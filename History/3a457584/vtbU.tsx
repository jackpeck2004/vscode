import { useState } from "react";
import { CTAButton, TextInput } from "src/components";
import { pushError, pushMessage } from "src/utils";
import { AddParticipantForm } from "./addParticipantForm";

export const AddParticipantModal = () => {
  const [challengeTitle, setChallengeTitle] = useState<string>();
  const [challengeContent, setChallengeContent] = useState<string>();
  const [challengeBaseDataset, setChallengeBaseDataset] = useState({
    url: "",
    data: [{}],
  });
  const [challengeParticipants, setChallengeParticipants] = useState([]);
  const [datasetFile, setDatasetFile] = useState(null);
  const [currentParticipant, setCurrentParticipant] = useState("");

  let fileReader;

  const handleFileRead = (e) => {
    const content = fileReader.result;
    setChallengeBaseDataset(content);
  };

  const handleFileChosen = (file) => {
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
    setDatasetFile(file);
  };

  const handleSubmit = async () => {
    //@ts-ignore
    console.table(typeof JSON.parse(challengeBaseDataset));
    // fetch post api
    const token = window.localStorage.AuthToken;

    console.log(token);

    if (token) {
      const res = await fetch("/api/challenges/create", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: token,
        },
        body: JSON.stringify({
          title: challengeTitle,
          content: challengeContent,
          //@ts-ignore
          baseDataset: JSON.parse(challengeBaseDataset),
          participants: challengeParticipants,
        }),
      });

      if (res.status === 200) {
        pushMessage("Successful!", "Challenge was created successfully");

        // clean inputs
        setChallengeTitle("");
        setChallengeContent("");
        setChallengeBaseDataset({
          url: "",
          data: [],
        });
        setChallengeParticipants([]);
        setDatasetFile(null);
        setCurrentParticipant("");
      } else {
        pushError("there was an error");
      }
    } else {
      pushError("You don't have the correct token");
    }
  };

  return (
    <div className="bg-white w-4/6 py-6 px-6 z-10 rounded-xl">
      <div className=" grid md:grid-cols-2 grid-cols-1">
        <div>
          <h2 className="text-2xl text-cblue">Add Participant</h2>
          <AddParticipantForm />
        </div>
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="grid grid-cols-1 gap-y-8 mt-8"
          >
            <h2 className="text-xl">Participants</h2>
            <ul className="list-disc grid grid-cols-2">
              {challengeParticipants.map((participant) => (
                <li
                  className="cursor-pointer hover:text-cred transition"
                  onClick={() => {
                    setChallengeParticipants(
                      challengeParticipants.filter((p) => p !== participant),
                    );
                  }}
                >
                  {participant}
                </li>
              ))}
            </ul>
            <div>
              <TextInput
                value={currentParticipant}
                onChange={(e) => setCurrentParticipant(e.target.value)}
                placeholder="participant id"
              />
              <button
                onClick={() => {
                  if (currentParticipant.length) {
                    setChallengeParticipants([
                      ...challengeParticipants,
                      currentParticipant,
                    ]);
                    setCurrentParticipant("");
                  }
                }}
              >
                add
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="mt-8 text-center w-full">
        <CTAButton
          onClick={() => {
            const bool =
              challengeTitle &&
              challengeContent &&
              challengeParticipants.length &&
              datasetFile &&
              challengeBaseDataset;

            if (!bool) {
              alert("did not fill in all fields");
              return;
            }

            handleSubmit();
          }}
          text={"add challenge"}
        />
      </div>
    </div>
  );
};
