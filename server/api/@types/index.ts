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
  authorId: string;
  likes?: number;
  meeting: {
    date: Date;
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
