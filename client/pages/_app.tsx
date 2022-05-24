import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Box, ChakraProvider, Divider } from "@chakra-ui/react";

import axios from "axios";
import { AuthProvider } from "../context/auth";
import Navbar from "../components/navbar/navbar";
import Sidebar from "../components/sidebar/sidebar";
import { useRouter } from "next/router";
// import Footer from "../components/footer/footer";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL + '/api';
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
            <Divider />
            {/* <Footer /> */}
          </>
        ) : (
          <Component {...pageProps} />
        )}
      </ChakraProvider>
    </AuthProvider>
  );
}

export default MyApp;
