import { type FC } from "react";
import classNames from "~/utils/classNames";

interface SmallButtonProps {
  title: string;
  icon?: JSX.Element;
  isFullWidth?: boolean;
  handleClick?: () => void;
  type?: "button" | "submit" | "reset";
  color?: "red" | "gray" | "green" | "blue" | "orange";
}

const SmallButton: FC<SmallButtonProps> = ({
  icon,
  title,
  handleClick,
  isFullWidth,
  color = "gray",
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={handleClick}
      className={classNames(
        isFullWidth && "w-full",
        color === "red" && "bg-red-600 text-white hover:bg-red-700",
        color === "gray" && "bg-gray-200 text-gray-800 hover:bg-gray-300",
        color === "green" && "bg-green-500 text-white hover:bg-green-600",
        color === "blue" && "bg-indigo-500 text-white hover:bg-indigo-600",
        color === "orange" && "bg-orange-500 text-white hover:bg-orange-600",
        "inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium"
      )}
    >
      {icon}
      {title}
    </button>
  );
};

export default SmallButton;
