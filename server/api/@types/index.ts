type DocumentResult<T> = {
  _doc: T;
};

export interface UserModel extends DocumentResult<UserModel> {
  username: string;
  email: string;
  password: string;
  isAdmin?: boolean;
}

export interface PostModel {
  title: string;
  body: string;
  author: string;
  likes?: number;
  comments?: [{ body: string; author: string }];
}

export interface CommentModel {
  body: string;
  author: string;
  likes?: number;
}
