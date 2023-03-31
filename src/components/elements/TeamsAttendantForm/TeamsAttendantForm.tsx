import { useAutoAnimate } from "@formkit/auto-animate/react";
import Button from "components/elements/Button/Button";
import ErrorMessage from "components/elements/ErrorMessage/ErrorMessage";
import InfoParagraph from "components/elements/InfoParagraph/InfoParagraph";
import Input from "components/elements/Input/Input";
import GridLayout from "components/layouts/GridLayout/GridLayout";
import type { FC } from "react";
import { useState } from "react";
import { BiTrash } from "react-icons/bi";
import type {
  AttendantType,
  TeamsAttendantMapType,
  TeamsAttendantType,
} from "types/team.types";
import classNames from "utils/classNames";

interface TeamsAttendantFormProps {
  teamsAttendants: TeamsAttendantMapType;
  deleteTeam: (name: string) => void;
  createTeam: (name: string, participants: TeamsAttendantType[]) => void;
  handleTeamsAttendantsUpdate: (
    oldName: string,
    newName: string,
    participants: TeamsAttendantType[]
  ) => void;
}

const TeamsAttendantForm: FC<TeamsAttendantFormProps> = ({
  createTeam,
  deleteTeam,
  teamsAttendants,
  handleTeamsAttendantsUpdate,
}) => {
  const [parent] = useAutoAnimate();
  const [teamName, setTeamName] = useState("");
  const [editTeamName, setEditTeamName] = useState<string | null>(null);
  const [teamAttendants, setTeamAttendants] = useState<AttendantType[]>([
    {
      id: "1",
      name: "",
    },
    {
      id: "2",
      name: "",
    },
  ]);

  const handleInputChange = (index: number, str: string) => {
    const newAttendants = [...teamAttendants];
    const newAttendant = newAttendants[index];

    if (newAttendant) {
      newAttendant.name = str;
    } else {
      newAttendants.push({
        id: `${index + 1}`,
        name: str,
      });
    }

    setTeamAttendants(newAttendants);
  };

  const handleTeamSwitch = (tName: string) => {
    if (editTeamName) {
      handleTeamsAttendantsUpdate(editTeamName, teamName, teamAttendants);
    }

    const team = teamsAttendants.get(tName);

    if (team) {
      const attendant: AttendantType[] = team.map((attendant, index) => {
        return {
          id: `${index + 1}`,
          name: attendant.name,
        };
      });

      setTeamName(tName);
      setTeamAttendants(attendant);
    }
  };

  const addNewAttendant = () => {
    const newAttendants = [...teamAttendants];
    const newAttendant = {
      id: `${newAttendants.length + 1}`,
      name: "",
    };

    newAttendants.push(newAttendant);
    setTeamAttendants(newAttendants);
  };

  const handleCreateTeam = () => {
    const participants = teamAttendants.filter((attendant) => attendant.name);

    if (editTeamName) {
      handleTeamsAttendantsUpdate(editTeamName, teamName, participants);
      setEditTeamName(null);
    } else {
      createTeam(teamName, participants);
    }

    setTeamName("");
    setTeamAttendants([
      {
        id: "1",
        name: "",
      },
      {
        id: "2",
        name: "",
      },
    ]);
  };

  const isFormValid = () => {
    if (teamName === "") return false;

    const participants = teamAttendants.filter((attendant) => attendant.name);

    if (participants.length < 2) return false;

    return true;
  };

  const getAttendantsKeyArray = () => {
    const keys = [...teamsAttendants.keys()];
    const sortedKeys = keys.sort();

    return sortedKeys;
  };

  const isTeamNameUnique = () => {
    const keys = getAttendantsKeyArray();

    if (!editTeamName) {
      return !keys.includes(teamName);
    }

    return true;
  };

  return (
    <div className="">
      <div className="mt-8">
        <InfoParagraph text="* To create a team, please enter the names of the team and at least two participants. Keep in mind that each team must have a minimum of two participants." />
        <div className="flex w-full flex-col md:w-1/2">
          <Input
            type="text"
            name="teamName"
            label="Team name"
            value={teamName}
            handleInputChange={(e) => setTeamName(e.target.value)}
          />
        </div>
        <div
          ref={parent}
          className="mt-4 flex max-h-[19rem] flex-col overflow-y-auto"
        >
          {teamAttendants.map((_attendant, index) => {
            const value = teamAttendants[index]?.name;

            return (
              <div key={index} className="flex w-full flex-row md:w-1/2">
                <Input
                  size="sm"
                  type="text"
                  value={value || ""}
                  name="participantName"
                  label={`${index + 1} participants name`}
                  handleInputChange={(e) =>
                    handleInputChange(index, e.target.value)
                  }
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-between py-2">
        <Button btnTitle="Add teammate" onClick={addNewAttendant} />
        <div className="flex">
          <Button
            btnTitle="Cancel"
            btnClass="mr-2"
            btnColor="red"
            onClick={() => {
              setTeamName("");
              setEditTeamName(null);
              setTeamAttendants([
                {
                  id: "1",
                  name: "",
                },
                {
                  id: "2",
                  name: "",
                },
              ]);
            }}
          />
          <Button
            btnTitle="Save team"
            onClick={handleCreateTeam}
            isDisabled={!isFormValid() || !isTeamNameUnique()}
          />
        </div>
      </div>
      {!isTeamNameUnique() && (
        <div className="flex w-full justify-end">
          <ErrorMessage message="Team name must be unique" />
        </div>
      )}

      <div className="mt-4">
        <div className="border-b-2">
          <label
            htmlFor="teamName"
            className="text-sm font-semibold text-gray-600"
          >
            Created teams
          </label>
        </div>
        <div className="h-[15rem] overflow-y-auto pt-4">
          <GridLayout isGap ref={parent} minWith="150-033">
            {getAttendantsKeyArray().map((teamName, i) => {
              return (
                <div key={`${teamName}${i}`} className="relative">
                  <button
                    onClick={() => {
                      if (editTeamName === teamName) {
                        setTeamName("");
                        setEditTeamName(null);
                        setTeamAttendants([
                          {
                            id: "1",
                            name: "",
                          },
                          {
                            id: "2",
                            name: "",
                          },
                        ]);
                        return;
                      }

                      setEditTeamName(teamName);
                      handleTeamSwitch(teamName);
                    }}
                    className={classNames(
                      editTeamName === teamName && "border-gray-800",
                      "w-full truncate rounded-md border-2 border-gray-300 bg-gray-300 px-3 py-2 text-sm font-bold transition-all duration-300"
                    )}
                  >
                    {teamName}
                  </button>
                  <div className=" absolute -top-2.5 right-0">
                    <button
                      onClick={() => deleteTeam(teamName)}
                      className="ml-2 rounded-full bg-gray-200 p-1 text-sm font-bold text-red-500"
                    >
                      <BiTrash />
                    </button>
                  </div>
                </div>
              );
            })}
          </GridLayout>
        </div>
      </div>
    </div>
  );
};

export default TeamsAttendantForm;