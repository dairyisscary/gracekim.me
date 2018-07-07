import React from "react";
import { Helmet } from "react-helmet";
import { styled } from "styletron-react";

import { FormButton, TextArea, Input, FieldLabel } from "common/form";
import Page from "common/page";

const Fields = styled("div", {
  display: "flex",
});
const Field = styled("div", {
  flex: "1",
  ":first-child": {
    marginRight: "2rem",
  },
});
const TextAreaContainer = styled("div", {
  margin: "1rem 0 1.5rem",
});

function Contact() {
  // eslint-disable-next-line no-useless-concat
  const safeAction = `https://formspree.io/${"g_kim" + "@" + "mit.edu"}`;
  return (
    <Page title="Contact">
      <Helmet>
        <title>Contact | Grace Kim</title>
      </Helmet>
      <form action={safeAction} method="POST">
        <Fields>
          <Field>
            <FieldLabel htmlFor="contactName">Name</FieldLabel>
            <Input type="text" id="contactName" name="name" autoComplete="name" />
          </Field>
          <Field>
            <FieldLabel htmlFor="contactEmail">Email</FieldLabel>
            <Input type="email" id="contactEmail" name="email" autoComplete="email" />
          </Field>
        </Fields>
        <TextAreaContainer>
          <FieldLabel htmlFor="contactMessage">Message</FieldLabel>
          <TextArea name="message" id="contactMessage" rows="4" />
        </TextAreaContainer>
        <FormButton type="submit">Send</FormButton>
      </form>
    </Page>
  );
}

export default Contact;
