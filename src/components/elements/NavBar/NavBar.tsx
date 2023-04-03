import MenuContainer from "components/containers/MenuContainer/MenuContainer";
import NewTournamentContainer from "components/containers/NewGameContainer/NewGameContainer";
import Logo from "components/elements/Logo/Logo";
import RoundLinkButton from "components/elements/RoundLinkButton/RoundLinkButton";
import { useRouter } from "next/router";
import type { FC } from "react";
import { api } from "utils/api";

const ROUTES_WITHOUT_NAVBAR = ["/login", "/signup"];

const NavBar: FC = () => {
  const router = useRouter();
  const { data } = api.users.getCurrentUser.useQuery();

  const isIndexPage = () => router.pathname === "/";

  if (ROUTES_WITHOUT_NAVBAR.includes(router.pathname)) return null;

  return (
    <nav className="py-4 px-4 shadow-[0_2px_5px_rgba(0,0,0,0.07)] md:py-12 md:px-20">
      {isIndexPage() ? (
        <div className="mb-0.5 flex items-center justify-between">
          <Logo />
          {data?.user ? (
            <RoundLinkButton href="/tournaments" linkTitle="Tournaments" />
          ) : (
            <RoundLinkButton href="/login" linkTitle="Login" />
          )}
        </div>
      ) : (
        <div className="mb-0.5 flex items-center justify-between">
          <MenuContainer />
          <Logo />
          <NewTournamentContainer />
        </div>
      )}
    </nav>
  );
};

export default NavBar;
