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
        I am an anthropologist of art and science, with a focus on how authenticity, expertise, and
        materiality come to matter through laboratory practice. My current book project examines how
        scientists develop technologies for the restoration of art and cultural heritage. I received
        my PhD in History, Anthropology, and Science, Technology, and Society (HASTS) at MIT in
        2019.
      </p>
      <p>
        I am currently a Postdoctoral Fellow in the Scholars Program at the{" "}
        <a href="https://www.getty.edu/research/scholars/years/current.html">
          Getty Research Institute
        </a>{" "}
        in Los Angeles.
      </p>
      <p>
        My <a href={CV}>curriculum vitae</a> is also available for download.
      </p>
    </Page>
  );
}

export default () => (
  <Layout>
    <About />
  </Layout>
);
