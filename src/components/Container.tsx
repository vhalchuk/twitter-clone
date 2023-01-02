import React from "react";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  component?: React.ElementType;
};

export const Container: React.FC<ContainerProps> = ({
  children,
  className = "",
  component,
}) => {
  const Component = component || "div";

  return (
    <Component className={`mx-auto max-w-xl ${className}`}>
      {children}
    </Component>
  );
};
