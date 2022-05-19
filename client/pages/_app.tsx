import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "../context/auth";
import { ChakraProvider } from "@chakra-ui/react";
import { useRouter } from "next/router";

import Navbar from "../components/navbar/navbar";
import Head from "../components/head/head";
import Sidebar from "../components/sidebar/sidebar";
import Axios from "axios";

Axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
Axios.defaults.withCredentials = true;

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  const routes = ["/", "/register", "/login"];
  const dontWrapTheseRoutes = routes.includes(pathname);
  return (
    <ChakraProvider>
      <AuthProvider>
        <Head />
        {!dontWrapTheseRoutes ? (
          <>
            <Navbar />
            <Sidebar>
              {/* @ts-ignore */}
              <Component {...pageProps} />
            </Sidebar>
          </>
        ) : (
          <>
            {/* @ts-ignore */}
            <Component {...pageProps} />
          </>
        )}
      </AuthProvider>
    </ChakraProvider>
  );
}
