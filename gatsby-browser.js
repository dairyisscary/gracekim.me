exports.onRouteUpdate = ({ location }) => {
  if (
    process.env.NODE_ENV === "production" &&
    typeof window.fathom === "function" &&
    location.hostname === "gracekim.me"
  ) {
    window.fathom("trackPageview");
  }
};
