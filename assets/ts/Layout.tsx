import { css, Global } from "@emotion/core";
import styled from "@emotion/styled";
import React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import SideBar from "./components/SideBar";

const PageMain = styled.main`
  width: 85%;
`;

const Flex = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
`;

const FLexGrow = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

export default function Layout({ children }: any) {
  return (
    <>
      <Global
        styles={css`
          html,
          body {
            font-family: -apple-system, sans-serif;
            text-align: center;
            font-size: 20px;
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
          }
          ul {
            margin: 0;
            padding: 0;
            list-style: none;
          }
          a {
            text-decoration: none;
          }
          img {
            max-width: 100%;
          }
          #app {
            width: 100%;
            min-height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
        `}
      />
      <FLexGrow>
        <Header />
        <Flex>
          <SideBar />
          <PageMain>{children}</PageMain>
        </Flex>
      </FLexGrow>
      <Footer />
    </>
  );
}
