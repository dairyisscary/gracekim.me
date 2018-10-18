import React from "react";
import { Helmet } from "react-helmet";
import { styled } from "styletron-react";
import "normalize.css";

import Styles from "./layout.css";

const Wrapper = styled("div", {
  display: "flex",
  flexDirection: "column",
  padding: "3rem 2rem",
  maxWidth: "100%",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
});

const Footer = styled("footer", {
  letterSpacing: "0.2rem",
  fontSize: "0.8rem",
  textTransform: "uppercase",
  textAlign: "center",
  marginTop: "2rem",
});

function Layout({ children }) {
  const currentYear = new Date().getFullYear();
  const extraLang = currentYear > 2018 ? "-present" : "";
  return (
    <Wrapper>
      <Helmet>
        <meta name="theme-color" content={Styles.bodyBackgroundColor} />
      </Helmet>
      {children}
      <Footer>
        &copy; Grace Kim 2018
        {extraLang}
      </Footer>
    </Wrapper>
  );
}

export default Layout;
