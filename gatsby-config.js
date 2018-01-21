module.exports = {
  plugins: [
    "gatsby-plugin-styletron",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: `${__dirname}/src/pages`,
      },
    },
    "gatsby-transformer-remark",
  ],
  siteMetadata: {
    title: "Grace Kim",
    siteUrl: "https://gracekim.me",
  },
};
