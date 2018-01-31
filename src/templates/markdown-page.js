import React from "react";
import { Helmet } from "react-helmet";

import Page from "common/page";

function MarkdownPage({ data }) {
  const post = data.markdownRemark;
  const { title } = post.frontmatter;
  return (
    <Page title={title}>
      <Helmet>
        <title>{title} | Grace Kim</title>
      </Helmet>
      <div
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </Page>
  );
}

export const query = graphql`
  query PostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;

export default MarkdownPage;
