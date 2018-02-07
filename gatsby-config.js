module.exports = {
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-styletron",
    {
      resolve: "gatsby-plugin-favicon",
      options: {
        logo: "./src/pages/images/favicon.png",
        injectHTML: true,
        icons: {
          android: true,
          appleIcon: false,
          appleStartup: false,
          coast: false,
          favicons: true,
          firefox: false,
          twitter: false,
          yandex: false,
          windows: false,
        },
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          "gatsby-plugin-sharp",
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 560,
              linkImagesToOriginal: false,
            },
          },
        ],
      },
    },
  ],
  siteMetadata: {
    title: "Grace Kim",
    siteUrl: "https://gracekim.me",
  },
};
