import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

import axios from "axios";
import { AuthProvider } from "../context/auth";
import Navbar from "../components/navbar/navbar";
import Sidebar from "../components/sidebar/sidebar";
import { useRouter } from "next/router";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
axios.defaults.withCredentials = true;

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  const routes = ["/", "/register", "/login"];
  const dontWrapTheseRoutes = routes.includes(pathname);
  return (
    <AuthProvider>
      <ChakraProvider>
        {!dontWrapTheseRoutes ? (
          <>
            <Navbar />
            <Sidebar>
              <Component {...pageProps} />
            </Sidebar>
          </>
        ) : (
          <Component {...pageProps} />
        )}
      </ChakraProvider>
    </AuthProvider>
  );
}

export default MyApp;
