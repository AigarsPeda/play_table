import { useAutoAnimate } from "@formkit/auto-animate/react";
import type { FC } from "react";
import type { ParticipantType } from "types/team.types";
import classNames from "utils/classNames";
import sortParticipants from "utils/sortParticipants";

interface GroupParticipantCard {
  participants: ParticipantType[];
}

const GroupParticipantCard: FC<GroupParticipantCard> = ({ participants }) => {
  const [parent] = useAutoAnimate();

  return (
    <div className="w-full">
      <div className="grid grid-cols-3 gap-4 border-b px-2 pb-2">
        <div className="flex justify-start">
          <p className="text-sm">Teams</p>
        </div>
        <div className="flex justify-center">
          <p className="text-sm">Small points</p>
        </div>
        <div className="flex justify-end">
          <p className="text-sm">Points</p>
        </div>
      </div>
      <ul ref={parent} className="w-full">
        {sortParticipants(participants).map((team, i) => {
          const isFirstGroup = i === 0;
          return (
            <li
              key={`${i}${team.id}`}
              className={classNames(
                !isFirstGroup && "border-t-2",
                "grid grid-cols-3 gap-4 px-2 py-2"
              )}
            >
              <div className="flex justify-start">
                <p>{team.name}</p>
              </div>
              <div className="flex justify-center">
                <p>{team.smallPoints}</p>
              </div>
              <div className="flex justify-end">
                <p>{team.points}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default GroupParticipantCard;
