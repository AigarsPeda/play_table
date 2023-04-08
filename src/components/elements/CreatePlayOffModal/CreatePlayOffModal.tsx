import Brackets from "components/elements/Brackets/Brackets";
import Button from "components/elements/Button/Button";
import addPlayoffTeam from "components/elements/CreatePlayOffModal/utils/addPlayoffTeam";
import cratePlayoffMap from "components/elements/CreatePlayOffModal/utils/cratePlayoffMap";
import removePlayoffTeam from "components/elements/CreatePlayOffModal/utils/removePlayoffTeam";
import type { GameType } from "components/elements/CreatePlayOffModal/utils/util.types";
import InfoParagraph from "components/elements/InfoParagraph/InfoParagraph";
import ModalWrap from "components/elements/ModalWrap/ModalWrap";
import PlayoffDropdown from "components/elements/PlayoffDropdown/PlayoffDropdown";
import { ALL } from "hardcoded";
import useRedirect from "hooks/useRedirect";
import type { FC } from "react";
import { useEffect, useState } from "react";
import type { TeamType, TeamsMapType } from "types/team.types";
import { api } from "utils/api";
import createAllPossibleOddNumberArray from "utils/createAllPossibleOddNumberArray";
import createMap from "utils/createMap";
import getFirstOddNumber from "utils/getFirstOddNumber";
import getShortestGroup from "utils/getShortestGroup";
import isOdd from "utils/isOdd";
import sortMap from "utils/sortMap";

interface CreatePlayOffModalProps {
  isModalOpen: boolean;
  tournamentId: string;
  handleCancelClick: () => void;
}

const CreatePlayOffModal: FC<CreatePlayOffModalProps> = ({
  isModalOpen,
  tournamentId,
  handleCancelClick,
}) => {
  const { redirectToPath } = useRedirect();
  const [teamCount, setTeamCount] = useState<number | null>(null);
  const [teamsMap, setTeamsMap] = useState<TeamsMapType>(new Map());
  const [brackets, setBrackets] = useState<Map<string, GameType[]>>(new Map());
  const [selectedTeams, setSelectedTeams] = useState<TeamType[]>([]);
  const { mutate } = api.teamsTournaments.createPlayoffGames.useMutation({
    onSuccess: () => {
      redirectToPath(`${tournamentId}/playoff/`);
    },
  });
  const { data: teams } = api.tournaments.getAllTournamentTeams.useQuery({
    tournamentId,
  });

  const putAllTeamsInOneGroup = (map: TeamsMapType) => {
    const allTeams = Array.from(map.values()).flat();

    const newMap = new Map<string, TeamType[]>();
    newMap.set(ALL, allTeams);

    return newMap;
  };

  const handleSaveGames = () => {
    if (!teamCount) return;

    const games = brackets.get(`${teamCount}`) || [];

    mutate({
      tournamentId,
      games,
    });
  };

  useEffect(() => {
    if (!teams) return;

    let tMap = sortMap(createMap(teams?.teams));

    const shortestLength = getShortestGroup(tMap);
    const keys = Array.from(tMap.keys());

    if (!isOdd([...keys].length) || !isOdd(shortestLength)) {
      // If there is an odd number of keys, we add all teams to one group
      // and create a new map with the new group
      tMap = sortMap(putAllTeamsInOneGroup(tMap));
    }

    const num = getFirstOddNumber(Math.round(getShortestGroup(tMap) / 2));
    const numArray = createAllPossibleOddNumberArray(num);
    const lastNum = numArray[numArray.length - 1];

    setTeamsMap(tMap);
    setTeamCount(lastNum || null);
  }, [teams]);

  useEffect(() => {
    if (!teamCount) return;

    const { playoffMap, selected } = cratePlayoffMap(teamCount, teamsMap);

    setBrackets(playoffMap);
    setSelectedTeams(selected);
  }, [teamCount, teamsMap]);

  return (
    <ModalWrap
      isFullScreen
      modalWidth="7xl"
      topPosition="top"
      isModalVisible={isModalOpen}
      modalTitle="Create playoffs"
      handleCancelClick={handleCancelClick}
    >
      <div className="h-full w-full overflow-x-auto overflow-y-auto pb-10">
        <InfoParagraph text="* Once playoffs are created, all other games will be finalized, and you will not be able to change or edit their scores." />
        <div className="mb-4 mr-3 flex justify-end">
          <PlayoffDropdown
            count={teamCount}
            handleCountClick={setTeamCount}
            availableLength={getShortestGroup(teamsMap)}
          />
        </div>

        <div className="ml-2 min-w-[25rem]">
          <Brackets
            teamsMap={teamsMap}
            brackets={[...brackets]}
            selectedTeams={selectedTeams}
            handleTeamsRemove={(team) => {
              const newBrackets = removePlayoffTeam(team, brackets);
              setBrackets(newBrackets);
              setSelectedTeams((prev) => {
                const newTeams = prev.filter((t) => t.id !== team.id);
                return newTeams;
              });
            }}
            handleTeamSelect={(team, oldTeams, stage, position, name) => {
              setSelectedTeams((prev) => {
                let newTeams = [...prev, team];
                if (oldTeams) {
                  newTeams = newTeams.filter((t) => t.id !== oldTeams.id);
                }

                return newTeams;
              });
              const newBrackets = addPlayoffTeam(
                team,
                stage,
                position,
                name,
                brackets
              );
              setBrackets(newBrackets);
            }}
          />
        </div>
        <div className="flex justify-end">
          <Button
            btnColor="outline"
            btnClass="mr-3"
            btnTitle="Create playoffs"
            onClick={handleSaveGames}
          />
        </div>
      </div>
    </ModalWrap>
  );
};

export default CreatePlayOffModal;
