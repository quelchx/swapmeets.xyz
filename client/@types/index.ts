type DocumentResult<T> = {
  _doc?: T;
};

export type InputRef = React.MutableRefObject<HTMLInputElement>;

export interface BlogPost {
  title: string;
  excerpt: string;
  image: string;
  date: string;
  tag: string;
}

export interface LocationProps {
  city: string;
  country: string;
  place: string;
  address: string;
}

export interface SocialProps {
  facebook: string;
  instagram: string;
  twitter: string;
  snapchat: string;
  tiktok: string;
}

export interface AuthorProps {
  id: string;
  username: string;
}

export interface CommentProps {
  _id: string;
  body: string;
  author: AuthorProps;
  likes?: [];
  createdAt: Date;
}

export interface MeetingProps {
  date: string;
  time: string;
  attending?: [];
  location: LocationProps;
}

export interface UserModel extends DocumentResult<UserModel> {
  _id?: string;
  username: string;
  email: string;
  password: string;
  isAdmin?: boolean;
  avatar?: string;
  socials?: SocialProps;
  bio?: string;
  city?: string;
  country?: string;
}

export interface PostModel extends DocumentResult<PostModel> {
  _id?: string;
  title: string;
  body: string;
  author: AuthorProps;
  likes?: [];
  meeting: MeetingProps;
  comments?: [CommentProps];
  slug: string;
  createdAt?: Date | string;
}
