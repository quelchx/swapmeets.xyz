type DocumentResult<T> = {
  _doc: T;
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
  likes?: number;
};

export type Socials = {
  facebook: string;
  instagram: string;
  twitter: string;
  snapchat: string;
  tiktok: string;
};

export interface UserModel extends DocumentResult<UserModel> {
  _id?: string;
  username: string;
  email: string;
  password: string;
  bio?: string;
  socials?: Socials;
  city?: string;
  country?: string;
  isAdmin?: boolean;
  verified?: boolean;
}

export interface PostModel extends DocumentResult<PostModel> {
  title: string;
  body: string;
  author: Author;
  likes?: number;
  meeting: Meeting;
  comments?: Array<Comment>;
  slug: string;
}
