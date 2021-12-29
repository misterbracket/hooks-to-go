import React, { ReactNode } from "react";
import styled from "styled-components";

const HiddenStyles = styled.span`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const StyledSpan = styled.span`
  color: var(--white);
`;

const VisuallyHidden = ({
  children,
  ...delegated
}: {
  children: ReactNode;
}): JSX.Element => {
  const [forceShow, setForceShow] = React.useState(false);
  React.useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      const handleKeyDown = (ev: KeyboardEvent) => {
        if (ev.key === "Alt") {
          setForceShow(true);
        }
      };
      const handleKeyUp = (ev: KeyboardEvent) => {
        if (ev.key === "Alt") {
          setForceShow(false);
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("keyup", handleKeyUp);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("keydown", handleKeyUp);
      };
    }
  }, []);
  if (forceShow) {
    return <StyledSpan>{children}</StyledSpan>;
  }
  return <HiddenStyles {...delegated}>{children}</HiddenStyles>;
};
export default VisuallyHidden;
