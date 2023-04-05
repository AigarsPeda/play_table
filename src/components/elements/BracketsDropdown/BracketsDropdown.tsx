import Button from "components/elements/Button/Button";
import Dropdown from "components/elements/Dropdown/Dropdown";
import useWindowSize from "hooks/useWindowSize";
import type { FC } from "react";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import classNames from "utils/classNames";
import type { TeamType, TeamsMapType } from "../../../types/team.types";
import ListButton from "../ListButton/ListButton";

interface BracketsDropdownProps {
  teamsMap: TeamsMapType;
  selectedTeam: TeamType | undefined;
  handleRemoveSelected: (selectedTeam: TeamType) => void;
}

const BracketsDropdown: FC<BracketsDropdownProps> = ({
  teamsMap,
  selectedTeam,
  handleRemoveSelected,
}) => {
  const { windowSize } = useWindowSize();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownClose = () => setIsDropdownOpen(false);
  const updateState = () => setIsDropdownOpen((state) => !state);

  const getBtnTitle = () => {
    if (selectedTeam) {
      return selectedTeam.name;
    }

    return windowSize.width <= 400 ? "Add" : "Add Teams";
  };

  return (
    <Dropdown
      isFullWidth
      isDropdownOpen={isDropdownOpen}
      handleDropdownClose={handleDropdownClose}
      dropdownBtn={
        <Button
          btnSize="full"
          fontSize="sm"
          onClick={updateState}
          btnTitle={
            <span className="flex w-full justify-center font-normal">
              {getBtnTitle()}
            </span>
          }
          icon={
            <IoIosArrowDown
              className={classNames(
                isDropdownOpen ? "-rotate-180" : "-rotate-0",
                "ml-3 h-6 w-6 transform-gpu text-white transition-all duration-300 ease-in-out"
              )}
            />
          }
        />
      }
    >
      <ul className="w-full">
        {selectedTeam && (
          <li className="border-b-2 border-gray-100">
            <ListButton
              btnTitle={<span className="text-red-500">Remove</span>}
              handleClick={() => {
                handleRemoveSelected(selectedTeam);
                handleDropdownClose();
              }}
            />
          </li>
        )}
        {[...teamsMap].map(([key, value], i) => {
          return (
            <div key={`${key}${i}`} className="border-b-2 border-gray-100">
              <p className="w-full bg-gray-800 px-3 text-2xl text-white">
                {key}
              </p>
              {value.map((team, i) => {
                return (
                  <li
                    key={`${team.id}${i}`}
                    className="border-b-2 border-gray-100"
                  >
                    <ListButton
                      btnTitle={
                        <span className="grid w-full grid-cols-3">
                          <span className="flex flex-col text-left">
                            <span className="text-xs text-gray-300">name</span>
                            <span>{team.name}</span>
                          </span>
                          <span className="flex flex-col text-center">
                            <span className="text-xs text-gray-300">sm</span>
                            <span>{team.smallPoints}</span>
                          </span>
                          <span className="flex flex-col text-right">
                            <span className="text-xs text-gray-300">lg</span>
                            <span>{team.points}</span>
                          </span>
                        </span>
                      }
                      handleClick={() => {
                        handleDropdownClose();
                        // handleCountClick(key);
                      }}
                    />
                  </li>
                );
              })}
            </div>
          );
        })}
      </ul>
    </Dropdown>
  );
};

export default BracketsDropdown;
