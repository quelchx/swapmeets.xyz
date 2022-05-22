type DocumentResult<T> = {
  _doc: T;
};

export interface UserModel extends DocumentResult<UserModel> {
  _id?: string;
  username: string;
  email: string;
  password: string;
  bio?: string;
  socials?: {
    facebook: string;
    instagram: string;
    twitter: string;
    snapchat: string;
    tiktok: string;
  };
  city?: string;
  country?: string;
  isAdmin?: boolean;
  verified?: boolean;
}

export interface PostModel extends DocumentResult<PostModel> {
  title: string;
  body: string;
  author: {
    id: string;
    username: string;
  };
  likes?: number;
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
      author: {
        id: string;
        username: string;
      };
      likes?: number;
    }
  ];
  slug: string;
}
