const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

exports.modifyWebpackConfig = function modifyWebpackConfig({ config }) {
  config.merge({
    resolve: {
      modulesDirectories: [
        path.resolve(__dirname, "./src"),
        path.resolve(__dirname, "./node_modules"),
      ],
    },
  });
  return config;
};

exports.onCreateNode = function onCreateNode({ node, getNode, boundActionCreators }) {
  const { createNodeField } = boundActionCreators;
  if (node.internal.type === "MarkdownRemark") {
    const slug = createFilePath({ node, getNode, basePath: "pages" });
    createNodeField({
      node,
      name: "slug",
      value: slug,
    });
  }
};

exports.createPages = function createPages({ graphql, boundActionCreators }) {
  const { createPage } = boundActionCreators;
  return new Promise(resolve => {
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
