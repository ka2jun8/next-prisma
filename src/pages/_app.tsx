import "../../styles/globals.css";

import { ApolloProvider } from "@apollo/client";
import React from "react";

import { useApollo } from "../apollo/client";

export default function App({ Component, pageProps }): JSX.Element {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
