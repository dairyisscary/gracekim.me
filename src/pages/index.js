import React from "react";
import { Helmet } from "react-helmet";
import { styled } from "styletron-react";

import Layout from "common/layout";
import { H1 } from "common/header";
import { RETINA_MEDIA_QUERY, SMALL_SCREEN } from "common/base-css";
import Link, { FADED_WHITE_BG } from "common/link";
import AvatarImg from "./images/avatar.png";
import AvatarImg2X from "./images/avatar@2x.png";

const contentBorderSize = "1px";
const contentMargin = "3rem";
const contentBorderColor = "#FFF";
const tagLineFontSize = "0.8rem";
const navLinkHeight = "2.75rem";
const avatarSize = "120px";

const IndexWrapper = styled("main", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
});

const Content = styled("div", {
  width: "100%",
  marginTop: contentMargin,
  marginBottom: contentMargin,
  borderStyle: "solid",
  borderColor: contentBorderColor,
  borderWidth: `${contentBorderSize} 0`,
  position: "relative",
  padding: "3rem 2rem",
  "::before": {
    content: "''",
    width: contentBorderSize,
    height: contentMargin,
    top: `calc(-${contentMargin} - ${contentBorderSize})`,
    left: `calc(50% - ${contentBorderSize})`,
    position: "absolute",
    background: contentBorderColor,
  },
  "::after": {
    content: "''",
    width: contentBorderSize,
    height: contentMargin,
    bottom: `calc(-${contentMargin} - ${contentBorderSize})`,
    left: `calc(50% - ${contentBorderSize})`,
    position: "absolute",
    background: contentBorderColor,
  },
});

const TagLine = styled("p", {
  textTransform: "uppercase",
  letterSpacing: "0.2rem",
  fontSize: tagLineFontSize,
  lineHeight: "2",
  margin: "0",
});

const Navigation = styled("nav", {
  display: "flex",
  border: `${contentBorderSize} solid ${contentBorderColor}`,
  borderRadius: "4px",
  margin: "0 2rem",
  [SMALL_SCREEN]: {
    flexDirection: "column",
  },
});

const NavLink = styled(Link, {
  minWidth: "7.5rem",
  padding: "0 1rem",
  height: navLinkHeight,
  lineHeight: navLinkHeight,
  letterSpacing: "0.2rem",
  fontSize: tagLineFontSize,
  textTransform: "uppercase",
  borderBottom: "none !important",
  ":not(:last-child)": {
    borderRight: `${contentBorderSize} solid ${contentBorderColor}`,
  },
  ":hover": {
    background: FADED_WHITE_BG,
  },
  [SMALL_SCREEN]: {
    borderRight: "none !important",
    ":not(:last-child)": {
      borderBottom: `${contentBorderSize} solid ${contentBorderColor} !important`,
    },
  },
});

const Avatar = styled("div", {
  width: avatarSize,
  height: avatarSize,
  border: `${contentBorderSize} solid ${contentBorderColor}`,
  borderRadius: "100%",
  backgroundSize: `${avatarSize} ${avatarSize}`,
  backgroundImage: `url("${AvatarImg}")`,
  backgroundPosition: "center center",
  backgroundRepeat: "no-repeat",
  [RETINA_MEDIA_QUERY]: {
    backgroundImage: `url("${AvatarImg2X}")`,
  },
});

function Index() {
  return (
    <IndexWrapper>
      <Helmet>
        <title>Grace Kim</title>
      </Helmet>
      <Avatar />
      <Content>
        <H1>Grace Kim</H1>
        <TagLine>Anthropologist of Art&nbsp;and&nbsp;Science</TagLine>
        <TagLine>Postdoctoral Fellow, Getty Research Institute</TagLine>
      </Content>
      <Navigation>
        <NavLink to="/about/">About</NavLink>
        <NavLink to="/research/">Research</NavLink>
        <NavLink to="/writing/">Writing</NavLink>
        <NavLink to="/contact/">Contact</NavLink>
      </Navigation>
    </IndexWrapper>
  );
}

export default () => (
  <Layout>
    <Index />
  </Layout>
);
