import React from "react";
import PropTypes from "prop-types";
import { styled } from "styletron-react";

import Link, { FADED_WHITE_BG } from "common/link";
import { H2 } from "common/header";
import BackButtonSVG from "pages/images/back-button.svg";

const PageContent = styled("article", {
  background: "rgba(27, 31, 34, 0.85)",
  padding: "4.5rem 2.5rem 1.5rem 2.5rem",
  width: "40rem",
  maxWidth: "100%",
  borderRadius: "4px",
  position: "relative",
});

const PageTitle = styled(H2, {
  borderBottom: "1px solid #FFF",
  paddingBottom: "0.5rem",
  margin: "0 0 2rem",
  width: "max-content",
});

const BackButton = styled(Link, {
  position: "absolute",
  top: "0.75rem",
  right: "0.75rem",
  display: "block",
  borderRadius: "100%",
  border: "none",
  width: "2.5rem",
  height: "2.5rem",
  background: `url("${BackButtonSVG}") center center no-repeat`,
  backgroundSize: "70%",
  ":hover": {
    backgroundColor: FADED_WHITE_BG,
  },
});

function Page({ children, title }) {
  return (
    <PageContent>
      <BackButton to="/" title="Back to Home" />
      <PageTitle>{title}</PageTitle>
      {children}
    </PageContent>
  );
}

Page.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Page;
