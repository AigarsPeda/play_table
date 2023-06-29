import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { api } from "~/utils/api";

const useTeams = () => {
  const router = useRouter();
  const { data: sessionData } = useSession();
  const [tournamentId, setTournamentId] = useState("");
  const { data, isLoading, refetch } = api.teams.getTeams.useQuery(
    { id: tournamentId },
    { enabled: Boolean(tournamentId) && sessionData?.user !== undefined }
  );

  useEffect(() => {
    if (router.query.id && typeof router.query.id === "string") {
      setTournamentId(router.query.id);
    }
  }, [router.query.id, setTournamentId]);

  // useEffect(() => {
  //   if (isRefetch) {
  //     void refetch();
  //   }
  // }, [isRefetch, refetch]);

  return { teams: data?.teams || [], isLoading, refetch, tournamentId };
};

export default useTeams;
