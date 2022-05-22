import type { NextPage } from "next/types";
import { useAuthState } from "../context/auth";

const Home: NextPage = () => {
  const { user } = useAuthState();
  return <div>Home</div>;
};

export default Home;
