import React from "react";
import About from "./pages/About";
import Home from "./pages/Home";

interface Routes {
  title: string;
  url: string;
  component: () => JSX.Element;
}

const routes: Routes[] = [
  {
    title: "Home",
    url: "/",
    component: Home,
  },
  {
    title: "About",
    url: "/about",
    component: About,
  },
];

export default routes;
