import Axios from "axios";

export const handleLikePost: any = async (
  post: string,
  user: string,
  router: any
) => {
  if (user === null) return;
  else {
    try {
      await Axios.put(`/posts/${post}/like`, { user: user });
      router.reload();
    } catch (error) {
      router.push("/error");
    }
  }
};

export const attendEventHandler: any = async (
  post: string,
  user: string,
  router: any
) => {
  if (user === null) return;
  else {
    try {
      await Axios.put(`/posts/${post}/attend-meeting`, { user: user });
      router.reload();
    } catch (err) {
      router.push("/error");
    }
  }
};
