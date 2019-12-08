import { styled } from "styletron-react";

export const FieldLabel = styled("label", {
  color: "#FFF",
  display: "block",
  fontSize: "0.8rem",
  fontWeight: "300",
  letterSpacing: "0.2rem",
  lineHeight: "1.5",
  margin: "0 0 1rem",
  textTransform: "uppercase",
});

const BASE_FORM_INPUT_STYLES = Object.freeze({
  // eslint-disable-next-line prettier/prettier
  transition:
    "border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out, background-color 0.2s ease-in-out",
  backgroundColor: "transparent",
  borderRadius: "4px",
  border: "1px solid #FFF",
  display: "block",
  outline: "0",
  textDecoration: "none",
  width: "100%",
  padding: "1rem",
  color: "#FFF",
  ":focus": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
});

export const Input = styled("input", BASE_FORM_INPUT_STYLES);
export const TextArea = styled("textarea", BASE_FORM_INPUT_STYLES);

export const FormButton = styled("button", {
  ...BASE_FORM_INPUT_STYLES,
  width: "auto",
  cursor: "pointer",
  padding: "0.5rem 1.5rem",
  outline: "none",
  fontWeight: "600",
  fontSize: "0.9rem",
  textTransform: "uppercase",
  ":hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
});
