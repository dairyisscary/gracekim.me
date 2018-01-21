import { styled } from "styletron-react";
import Link from "gatsby-link";

const baseLinkStyles = {
  color: "#FFF",
  textDecoration: "none",
  transition:
    "color 0.2s ease-in-out, background-color 0.2s ease-in-out, border-bottom-color 0.2s ease-in-out",
  borderBottom: "1px dotted rgba(255, 255, 255, 0.5)",
  ":hover": {
    borderBottomColor: "transparent",
  },
};

export const FADED_WHITE_BG = "rgba(255, 255, 255, 0.075)";
export const A = styled("a", baseLinkStyles);

export default styled(Link, baseLinkStyles);
