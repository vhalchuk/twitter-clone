import React from "react";
import cx from "classnames";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "submit" | "reset" | "button";
  variant?: "primary" | "secondary";
  className?: string;
};

const commonClasses = `
  w-fit
  self-end
  rounded-full
  px-4 py-2
  font-semibold
`;

const primaryClasses = `
  text-white
  bg-blue-400
  hover:bg-blue-500
  outline-blue-300
`;
const secondaryClasses = `
  text-black
  bg-white
  hover:bg-gray-100
`;

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type,
  variant = "primary",
  className,
}) => {
  const classNames = cx(
    commonClasses,
    {
      [primaryClasses]: variant === "primary",
      [secondaryClasses]: variant === "secondary",
    },
    className
  );

  return (
    <button type={type} onClick={onClick} className={classNames}>
      {children}
    </button>
  );
};
