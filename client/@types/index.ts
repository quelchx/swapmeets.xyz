import React from "react";

export type PathType = { href: string };

export interface RouteProps extends PathType {
  name: string;
}

export interface NavLinkProps extends PathType {
  children: React.ReactNode;
}
