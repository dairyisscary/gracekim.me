const React = require("react");

function getFathomScriptTags() {
  const fathomInlineContent = `
    (function(f,a,t,h){
      a[h]=a[h]||function(){
        (a[h].q=a[h].q||[]).push(arguments)
      };
    })(document,window,null,"fathom");
    fathom("set", "siteId", "ZYYBPLEI");
    if (window.location.hostname === "gracekim.me")
      fathom("trackPageview");
  `;
  return [
    <script
      key="fathom-inline-js"
      type="text/javascript"
      dangerouslySetInnerHTML={{ __html: fathomInlineContent }} // eslint-disable-line react/no-danger
    />,
    <script
      key="fathom-remote-js"
      type="text/javascript"
      async
      src="https://cdn.usefathom.com/tracker.js"
      id="fathom-script"
    />,
  ];
}

exports.onRenderBody = ({ setPostBodyComponents }) => {
  if (process.env.NODE_ENV === "production") {
    return setPostBodyComponents(getFathomScriptTags());
  }
  return null;
};
