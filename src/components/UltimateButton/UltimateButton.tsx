import React, { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import * as Styled from "./UltimateButton.styles";

export type ButtonProps<T extends ElementType> = {
  renderAs?: T;
  isLoading?: boolean;
  isCompleted?: boolean;
  disabled?: boolean;
  children: ReactNode;
} & ComponentPropsWithoutRef<T>;

const UltimateButton = <T extends ElementType = "button">({
  renderAs,
  isLoading,
  isCompleted,
  children,
  ...rest
}: ButtonProps<T>): JSX.Element => {
  return (
    <Styled.BTN
      as={renderAs as ElementType}
      isLoading={isLoading}
      isCompleted={isCompleted}
      {...rest}
    >
      {children}
    </Styled.BTN>
  );
};

export default UltimateButton;
