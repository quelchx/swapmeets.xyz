import React from "react";
import NavLink from "./navlink";
import Routes from "../../routes";

const NavList = () => {
  return (
    <>
      {Routes.map((route) => (
        <NavLink href={route.href} key={`desktop-${route.name}`}>
          {route.name}
        </NavLink>
      ))}
    </>
  );
};

export default NavList;
