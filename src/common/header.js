import { styled } from "styletron-react";

const BASE_HEADER_STYLES = {
  fontWeight: 400,
  textTransform: "uppercase",
  margin: "0 0 1rem 0",
  letterSpacing: "0.4rem",
  fontFamily: "'Raleway', sans-serif",
};

export const H1 = styled("h1", {
  ...BASE_HEADER_STYLES,
  fontSize: "2.25rem",
  lineHeight: "1.3",
});

export const H2 = styled("h2", {
  ...BASE_HEADER_STYLES,
  fontSize: "1.5rem",
  lineHeight: "1.4",
});
