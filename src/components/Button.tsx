import React from "react";
import cx from "classnames";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "submit" | "reset" | "button";
  variant?: "primary" | "secondary";
  className?: string;
  disabled?: boolean;
};

const commonClasses = `
  w-fit
  self-end
  rounded-full
  px-4 py-2
  font-semibold
  cursor-pointer
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

const disabledClasses = `
hover:cursor-not-allowed
`;

const disabledPrimaryClasses = `
  hover:cursor-not-allowed
  bg-gray-300
  hover:bg-gray-300
`;

const disabledSecondaryClasses = `
  hover:cursor-not-allowed
  bg-gray-100
  hover:bg-gray-100
  text-gray-300
`;

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type,
  variant = "primary",
  className,
  disabled,
}) => {
  const classNames = cx(
    commonClasses,
    {
      [primaryClasses]: variant === "primary",
      [secondaryClasses]: variant === "secondary",
      [disabledClasses]: disabled,
      [disabledPrimaryClasses]: variant === "primary" && disabled,
      [disabledSecondaryClasses]: variant === "secondary" && disabled,
    },
    className
  );

  return (
    <button
      type={type}
      onClick={onClick}
      className={classNames}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
