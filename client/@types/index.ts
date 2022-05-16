import type { BoxProps, FlexProps } from "@chakra-ui/react";
import type {
  ReactNode,
  ElementType,
  ChangeEvent,
  ComponentProps,
  MutableRefObject,
} from "react";

import type { IconType } from "react-icons";

export type PathType = { href: string };
export type FieldReferenceType = MutableRefObject<HTMLInputElement>;
export type ReactChildren = { children: ReactNode };

export type DocumentResult<T> = {
  _doc?: T;
};

export type Author = {
  id: string;
  username: string;
};

export type Location = {
  city: string;
  country: string;
  place: string;
  address: string;
};

export type Meeting = {
  date: string;
  time: string;
  attending?: [];
  location: Location;
};

export type Comment = {
  body: string;
  author: Author;
  likes?: [];
};

export type LinkItemProps = {
  name: string;
  icon: IconType;
  href: string;
};

export type AuthFormType = {
  type: "login" | "register";
};

export type FieldProps<E extends ElementType> = FieldInitialProps<E> &
  Omit<ComponentProps<E>, keyof FieldInitialProps<E>>;

export type InputEventChange = ChangeEvent<HTMLInputElement>;

export type SocialProps = {
  facebook: string;
  instagram: string;
  twitter: string;
  snapchat: string;
  tiktok: string;
};

export type AuthAction = {
  type: string;
  payload: any;
};

export interface UserModel extends DocumentResult<UserModel> {
  _id?: string;
  username: string;
  email: string;
  password: string;
  isAdmin?: boolean;
  avatar?: string;
  socials?: SocialProps;
}

export interface AuthState {
  authenticated: boolean;
  user: UserModel | undefined;
  loading: boolean;
}

export interface SidebarProps extends BoxProps {
  onClose: () => void;
}

export interface MobileProps extends FlexProps {
  onOpen: () => void;
}

export interface PostModel extends DocumentResult<PostModel> {
  _id?: string;
  title: string;
  body: string;
  author: Author;
  likes?: [];
  meeting: Meeting;
  comments?: Array<Comment>;
  slug: string;
}

export interface RouteProps extends PathType {
  name: string;
}

export interface NavLinkProps extends PathType {
  children: ReactNode;
}

export interface FieldInitialProps<E extends ElementType> {
  as?: E;
  children?: ReactNode;
  innerRef?: FieldReferenceType;
}
