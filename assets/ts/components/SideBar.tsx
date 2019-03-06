import styled from "@emotion/styled";
import React from "react";
import { Link } from "react-router-dom";
import routes from "../Routes";
import { colors } from "../Theme";

const GlobalSideBar = styled.aside`
  width: 15%;
  height: 100%;
`;

const NavigatorList = styled.ul`
  color: #000;
  text-align: left;
  padding-top: 10px;
`;

const NavigatorItem = styled.li`
  transition: 0.3s all ease-in-out;
  border-left: 5px solid transparent;
  &:hover {
    border-left: 5px solid ${colors.secondary};
  }
`;

const NavigatorText = styled.span`
  padding: 5px 15px;
  display: block;
  color: #000;
  font-size: 24px;
`;

export default function SideBar() {
  return (
    <GlobalSideBar>
      <NavigatorList>
        {routes.map((route, key) => (
          <NavigatorItem key={`sidebar-${key}`}>
            <Link to={route.url}>
              <NavigatorText>{route.title}</NavigatorText>
            </Link>
          </NavigatorItem>
        ))}
      </NavigatorList>
    </GlobalSideBar>
  );
}
