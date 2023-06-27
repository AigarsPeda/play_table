import dynamic from "next/dynamic";
import { useState, type FC } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { LuSplitSquareHorizontal } from "react-icons/lu";
import SmallButton from "~/components/elements/SmallButton/SmallButton";
import TopDrawerLayout from "~/components/elements/TopDrawerLayout/TopDrawerLayout";
import classNames from "~/utils/classNames";

const SplitTournamentModal = dynamic(
  () =>
    import("~/components/elements/SplitTournamentModal/SplitTournamentModal")
);

const DeleteTournamentModal = dynamic(
  () =>
    import("~/components/elements/DeleteTournamentModal/DeleteTournamentModal")
);

const SettingsDrawer: FC = () => {
  const [isSplitModal, setIsSplitModal] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);

  return (
    <>
      <TopDrawerLayout>
        <div
          className={classNames(
            "w-full bg-gray-800 px-4 py-4 text-white shadow-[0_2px_5px_rgba(0,0,0,0.07)] outline-none transition-all duration-300 ease-in-out md:px-12 md:py-4"
          )}
        >
          <h1>Tournament setting</h1>
          <div className="mt-10 flex flex-wrap space-x-6">
            <SmallButton
              color="red"
              icon={<AiOutlineDelete className="mr-2 h-[1.4rem] w-[1.4rem]" />}
              title="Delete"
              handleClick={() => {
                setIsDeleteModal(true);
              }}
            />
            <SmallButton
              color="gray"
              icon={<LuSplitSquareHorizontal className="mr-2 h-6 w-6" />}
              title="Split"
              handleClick={() => {
                setIsSplitModal(true);
              }}
            />
          </div>
        </div>
      </TopDrawerLayout>
      <DeleteTournamentModal
        isDeleteModal={isDeleteModal}
        handleCancelClicks={() => {
          setIsDeleteModal(false);
        }}
      />
      <SplitTournamentModal
        isSplitModal={isSplitModal}
        handleCancelClicks={() => {
          setIsSplitModal(false);
        }}
      />
    </>
  );
};

export default SettingsDrawer;
