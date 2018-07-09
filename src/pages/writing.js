import React from "react";
import { Helmet } from "react-helmet";

import Page from "common/page";
import Microbes from "./microbes.pdf";

function Writing() {
  return (
    <Page title="Writing">
      <Helmet>
        <title>Writing | Grace Kim</title>
      </Helmet>
      <h3>
        <a href="https://www.tandfonline.com/eprint/a4XxE3yTrtvwDtCUekA8/full">
          “Cigarettes, Saliva, Art: Laboratory Expertise in Florence, Italy”
        </a>
      </h3>
      <p>
        {"In Florence, I followed artisanal and scientific restoration practices. "}
        {"This article focuses on seemingly trivial material traces—the monk’s cigarette "}
        {"and the chemist’s saliva—as embodiments of these experts’ confidence and discernment "}
        {"with precious historical and aesthetic artifacts. I argue that both the artisan "}
        {"and the scientist perform expertise by relying on sensory, craft-based "}
        {"familiarity with materials. Published in the "}
        <em>Journal of Modern Craft</em>
      </p>
      <h3>
        <a href={Microbes}>
          “Putting Microbes to Work: Using Biotechnology to Restore Architecture & Art in Italy”
        </a>
      </h3>
      <p>
        {"How are artworks and cultural heritage made into restoration “workspaces” for "}
        {"microbes? Here, I think through the implications of the multispecies work that "}
        {"brings microbiologists and bacteria together to clean and consolidate artifacts "}
        {"ranging from ancient clay terraces in Sicily to a modern stone statue in the "}
        {"Monumental Cemetery of Milan. Published in "}
        <em>Thresholds</em>
      </p>
      <h3>
        <a href="http://histanthro.org/reviews/all-the-world-is-here/">
          “All the World Is Here,” Exhibition Review
        </a>
      </h3>
      <p>
        {"My colleague, Alison Laurence, and I reviewed the exhibition, "}
        <em>
          {"All the World Is Here: Harvard’s Peabody Museum and the "}
          {"Invention of American Anthropology"}
        </em>
        {", at Harvard "}
        {"University’s Peabody Museum of Archaeology & Ethnology. Published in the "}
        <em>History of Anthropology Newsletter</em>
      </p>
    </Page>
  );
}

export default Writing;
