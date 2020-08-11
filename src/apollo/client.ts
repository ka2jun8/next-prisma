/* eslint-disable @typescript-eslint/no-var-requires */
import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { useMemo } from "react";

let apolloClient: ApolloClient<NormalizedCacheObject>;

// TODO
// function createIsomorphLink() {
//   console.log({ createIsomorphLink: typeof window === "undefined" });
//   if (typeof window === "undefined") {
//     const { SchemaLink } = require("@apollo/client/link/schema");
//     const { schema } = require("./schema");
//     return new SchemaLink({ schema });
//   }

//   const { HttpLink } = require("@apollo/client/link/http");
//   return new HttpLink({
//     uri: "/api/graphql",
//     credentials: "same-origin",
//   });
// }

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    cache: new InMemoryCache(),
    // TODO isomorphic
    uri: "http://localhost:3000/api/graphql",
    // link: createIsomorphLink(),
  });
}

export function initializeApollo(
  initialState = null
): ApolloClient<NormalizedCacheObject> {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }

  if (typeof window === "undefined") return _apolloClient;

  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(
  initialState: NormalizedCacheObject
): ApolloClient<NormalizedCacheObject> {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
