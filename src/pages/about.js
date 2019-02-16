import React from "react";
import { Helmet } from "react-helmet";

import Layout from "common/layout";
import Page from "common/page";
import CV from "./cv.pdf";

function About() {
  return (
    <Page title="About">
      <Helmet>
        <title>About | Grace Kim</title>
      </Helmet>
      <p>
        {
          "Focusing on matters of materiality and expertise, I am an anthropologist who studies how "
        }
        {
          "scientists develop technologies for the restoration of art and cultural heritage. I have "
        }
        {
          "recently received my PhD in History, Anthropology, and Science, Technology, and Society at MIT."
        }
      </p>
      <p>
        {"I am currently a "}
        <a href="https://anthropology.mit.edu/people/visitors">
          {"lecturer in the Anthropology department at MIT"}
        </a>
        {"."}
      </p>
      <p>
        {"My "}
        <a href={CV}>curriculum vitae</a>
        {" is also available for download."}
      </p>
    </Page>
  );
}

export default () => (
  <Layout>
    <About />
  </Layout>
);
