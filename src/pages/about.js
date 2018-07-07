import React from "react";
import { Helmet } from "react-helmet";

import Page from "common/page";
import CV from "./cv.pdf";

function About() {
  return (
    <Page title="About">
      <Helmet>
        <title>About | Grace Kim</title>
      </Helmet>
      <p>
        {"I am a "}
        <a href="http://web.mit.edu/hasts/graduate/kim.html">
          {"PhD candidate in MIT"}
          &apos;
          {"s Graduate Program in History | Anthropology | Science, Technology, and Society"}
        </a>
        {". Focusing on materiality and expertise, I am a cultural anthropologist "}
        {"who studies the intersections of artworks, cultural heritage, and technoscience."}
      </p>
      <p>
        {"My CV is available for download "}
        <a href={CV}>here</a>
        {"."}
      </p>
    </Page>
  );
}

export default About;
