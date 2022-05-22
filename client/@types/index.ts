type DocumentResult<T> = {
  _doc?: T;
};

export type InputRef = React.MutableRefObject<HTMLInputElement>;

export interface UserModel extends DocumentResult<UserModel> {
  _id?: string;
  username: string;
  email: string;
  password: string;
  isAdmin?: boolean;
  avatar?: string;
  socials?: {
    facebook: string;
    instagram: string;
    twitter: string;
    snapchat: string;
    tiktok: string;
  };
  bio?: string;
}

export interface PostModel extends DocumentResult<PostModel> {
  _id?: string;
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
      _id: string;
      body: string;
      author: {
        id: string;
        username: string;
      };
      likes?: [];
      createdAt: Date;
    }
  ];
  slug: string;
}
