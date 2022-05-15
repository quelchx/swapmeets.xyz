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
  _doc: T;
};

export type AuthFormType = {
  type: "login" | "register";
};
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

export type FieldProps<E extends ElementType> = FieldInitialProps<E> &
  Omit<ComponentProps<E>, keyof FieldInitialProps<E>>;

export type InputEventChange = ChangeEvent<HTMLInputElement>;

export interface UserModel extends DocumentResult<UserModel> {
  username: string;
  email: string;
  password: string;
  isAdmin?: boolean;
}

export interface AuthState {
  authenticated: boolean;
  user: UserModel | undefined;
  loading: boolean;
}

export interface AuthAction {
  type: string;
  payload: any;
}

export interface SidebarProps extends BoxProps {
  onClose: () => void;
}

export interface LinkItemProps {
  name: string;
  icon: IconType;
  href: string;
}

export interface MobileProps extends FlexProps {
  onOpen: () => void;
}
export interface PostModel {
  _id: string;
  title: string;
  body: string;
  author: {
    id: string;
    username: string;
  };
  likes?: [];
  meeting: {
    date: string;
    time: string;
    attending?: [];
    location: {
      city: string;
      country: string;
      place: string;
      address: string;
    };
  };
  comments?: [
    {
      body: string;
      author: string;
      authorId: string;
      likes?: number;
    }
  ];
}
