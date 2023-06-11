import { type TeamType } from "~/types/tournament.types";

const createGames = (teams: TeamType[], tournamentId: string) => {
  let order = 1;
  const games = [];
  for (let i = 0; i < teams.length; i++) {
    for (let j = i + 1; j < teams.length; j++) {
      const teamOneId = teams[i]?.id;
      const teamTwoId = teams[j]?.id;

      if (teamOneId && teamTwoId) {
        games.push({
          teamOneId,
          teamTwoId,
          tournamentId,
          order: order++,
        });
      }
    }
  }

  return games;
};

export default createGames;