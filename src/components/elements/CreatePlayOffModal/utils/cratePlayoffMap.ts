import type { GameType } from "components/elements/CreatePlayOffModal/utils/util.types";
import type { TeamsMapType, TeamType } from "types/team.types";
import getRandomValues from "utils/getRandomValues";

const cratePlayoffMap = (num: number, map: TeamsMapType) => {
  const originalNum = num;
  const keys = Array.from(map.keys());

  const selected: TeamType[] = [];
  const playoffMap = new Map<string, GameType[]>();
  const isSlice = keys.length > 1;

  while (num > 0) {
    const arr = Array.from(Array(num).keys()).map((n) => {
      const randomGroup = getRandomValues(num || 0, keys);
      const firstGroup = randomGroup[0] || "";
      const secondGroup = randomGroup[1] || "";

      const firstGroupTeams = isSlice
        ? map.get(firstGroup)?.slice(0, originalNum)
        : map.get(firstGroup) || [];
      const secondGroupTeams = isSlice
        ? map.get(secondGroup)?.slice(0, originalNum)
        : map.get(secondGroup) || [];

      const firstGroupTeamsLength = firstGroupTeams?.length || 0;

      // If Math.round is used, team with more points may not be selected
      const middleIdx = Math.floor(firstGroupTeamsLength / 2);

      const games: GameType = {
        bracketNum: n,
        stage: num.toString(),
        team1: {
          team1: undefined,
        },
        team2: {
          team2: undefined,
        },
      };

      if (num === originalNum && firstGroupTeams && secondGroupTeams) {
        const num = n + 1;

        // select teams from middle of the group
        const firstTeam = firstGroupTeams[middleIdx - num];
        const secondTeam = secondGroupTeams[middleIdx + n];

        games.team1.team1 = firstTeam;
        games.team2.team2 =
          firstTeam?.id === secondTeam?.id ? undefined : secondTeam;

        firstTeam && selected.push(firstTeam);
        secondTeam && selected.push(secondTeam);
      }

      return games;
    });

    playoffMap.set(`${num}`, arr);

    num = Math.floor(num / 2);
  }

  return { playoffMap, selected };
};

export default cratePlayoffMap;