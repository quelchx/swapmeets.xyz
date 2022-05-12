import "../styles/globals.css";
import Axios from "axios";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

import Navbar from "../components/navbar/navbar";
import { AuthProvider } from "../context/auth";

Axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
Axios.defaults.withCredentials = true;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Navbar />
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}
