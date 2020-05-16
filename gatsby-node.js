const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

exports.onCreateWebpackConfig = function modifyWebpackConfig({ actions }) {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, "./src"), path.resolve(__dirname, "./node_modules")],
    },
  });
};

exports.onCreateNode = function onCreateNode({ node, getNode, actions: { createNodeField } }) {
  if (node.internal.type === "MarkdownRemark") {
    const slug = createFilePath({ node, getNode, basePath: "pages" });
    createNodeField({
      node,
      name: "slug",
      value: slug,
    });
  }
};

exports.createPages = function createPages({ graphql, actions: { createPage } }) {
  return new Promise((resolve) => {
    graphql(`
      query MarkDown {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `).then(({ data }) => {
      data.allMarkdownRemark.edges.forEach(({ node }) => {
        const { slug } = node.fields;
        createPage({
          path: slug,
          component: path.resolve("./src/templates/markdown-page.js"),
          context: { slug },
        });
      });
      resolve();
    });
  });
};
