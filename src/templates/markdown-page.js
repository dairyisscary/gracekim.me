import React from "react";

import Page from "common/page";

function MarkdownPage({ data }) {
  const post = data.markdownRemark;
  return (
    <Page title={post.frontmatter.title}>
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
