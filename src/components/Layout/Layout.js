import React from "react";

import Navigation from "./Navigation";

const Layout = (props) => {
  return (
    <>
      <Navigation />
      <main>{props.children}</main>
    </>
  );
};

export default Layout;
