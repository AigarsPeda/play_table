import { useSession } from "next-auth/react";
import { useState, type FC } from "react";
import { TiThMenu } from "react-icons/ti";
import DrawerLayout from "~/components//layout/DrawerLayout/DrawerLayout";
import AuthenticateUser from "~/components/elements/AuthenticateUser/AuthenticateUser";
import { type LinkType } from "~/components/elements/NavBar/NavBar";
import NavLink from "~/components/elements/NavBar/NavLink";
import PrimaryButton from "~/components/elements/PrimaryButton/PrimaryButton";

interface MobileNavProps {
  links: LinkType[];
}

const MobileNav: FC<MobileNavProps> = ({ links }) => {
  const { data: sessionData, status } = useSession();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  return (
    <DrawerLayout
      drawerSide="right"
      isDrawerOpen={isDrawerOpen}
      handleDropdownClose={() => {
        setIsDrawerOpen(false);
      }}
      drawerBtn={
        <div className="flex w-full justify-end">
          <PrimaryButton
            btnTitle={<TiThMenu className="h-6 w-6" />}
            handleClick={() => {
              setIsDrawerOpen((state) => !state);
            }}
          />
        </div>
      }
    >
      <div className="px-5">
        <NavLink
          isSpaceY
          links={links}
          sessionData={sessionData}
          onLinkClick={() => {
            setIsDrawerOpen(false);
          }}
        />

        <div className="mt-10">
          <AuthenticateUser sessionData={sessionData} status={status} />
        </div>
      </div>
    </DrawerLayout>
  );
};

export default MobileNav;