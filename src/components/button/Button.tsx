import React from "react";
import cx from "classnames";
import {
  commonClasses,
  disabledClasses,
  disabledPrimaryClasses,
  disabledSecondaryClasses,
  primaryClasses,
  secondaryClasses,
} from "./styles";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "submit" | "reset" | "button";
  variant?: "primary" | "secondary";
  className?: string;
  disabled?: boolean;
};

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
