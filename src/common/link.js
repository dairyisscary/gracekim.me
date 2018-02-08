import { styled } from "styletron-react";
import Link from "gatsby-link";

import LinkStyles from "./link.css";

const { hoverBorderColor, ...baseLinkStyles } = LinkStyles;
const fullLinkStyles = {
  ...baseLinkStyles,
  ":hover": {
    borderBottomColor: hoverBorderColor,
  },
};

export const FADED_WHITE_BG = "rgba(255, 255, 255, 0.075)";
export const A = styled("a", fullLinkStyles);

export default styled(Link, fullLinkStyles);
