import React from "react";
import { styled } from "styletron-react";

import { H1 } from "common/header";
import { RETINA_MEDIA_QUERY } from "common/base-css";
import Link, { FADED_WHITE_BG, A } from "common/link";
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
  border: `${contentBorderSize} solid ${contentBorderColor}`,
  borderLeftWidth: "0",
  borderRightWidth: "0",
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
});

const NavLink = styled(Link, {
  minWidth: "7.5rem",
  height: navLinkHeight,
  lineHeight: navLinkHeight,
  letterSpacing: "0.2rem",
  fontSize: tagLineFontSize,
  textTransform: "uppercase",
  borderBottom: "none",
  ":not(:last-child)": {
    borderRight: `${contentBorderSize} solid ${contentBorderColor}`,
  },
  ":hover": {
    background: FADED_WHITE_BG,
  },
});

const Avatar = styled("div", {
  width: avatarSize,
  height: avatarSize,
  border: `${contentBorderSize} solid ${contentBorderColor}`,
  borderRadius: "100%",
  background: `url("${AvatarImg}") center center no-repeat`,
  backgroundSize: `${avatarSize} ${avatarSize}`,
  [RETINA_MEDIA_QUERY]: {
    backgroundImage: `url("${AvatarImg2X}")`,
  },
});

function Index({ data }) {
  const pages = data.allMarkdownRemark.edges;
  return (
    <IndexWrapper>
      <Avatar />
      <Content>
        <H1>Grace Kim</H1>
        <TagLine>
          {"PhD Candidate, "}
          <A href="http://web.mit.edu/hasts/" target="_blank">
            MIT HASTS Program
          </A>
        </TagLine>
      </Content>
      <Navigation>
        {pages.map(({ node: { id, frontmatter, fields } }) => (
          <NavLink key={id} to={fields.slug}>
            {frontmatter.title}
          </NavLink>
        ))}
      </Navigation>
    </IndexWrapper>
  );
}

export const query = graphql`
  query GraceKimMePages {
    allMarkdownRemark {
      edges {
        node {
          id
          frontmatter {
            title
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;

export default Index;
