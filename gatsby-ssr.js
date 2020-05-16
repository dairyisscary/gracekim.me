const React = require("react");

function getFathomScriptTags() {
  return [
    <script
      key="fathom-remote-js"
      type="text/javascript"
      src="https://zebra.gracekim.me/script.js"
      spa="auto"
      site="ZYYBPLEI"
      defer
    />,
  ];
}

exports.onRenderBody = ({ setPostBodyComponents }) => {
  if (process.env.NODE_ENV === "production") {
    return setPostBodyComponents(getFathomScriptTags());
  }
  return null;
};
