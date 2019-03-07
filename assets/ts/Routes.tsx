import React from "react";
import Chat from "./pages/Chat";
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
    title: "Chat",
    url: "/chat",
    component: Chat,
  },
];

export default routes;
