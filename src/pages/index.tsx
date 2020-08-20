import { NormalizedCacheObject, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import Head from "next/head";
import Link from "next/link";
import React from "react";

import { initializeApollo } from "../apollo/client";

const ViewerQuery = gql`
  query ViewerQuery {
    viewer {
      id
      name
      status
    }
  }
`;

const Index = () => {
  const {
    data: { viewer },
  } = useQuery(ViewerQuery);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div>
          You are singed in as {viewer.name} and you are {viewer.status} goto
          <Link href="/">
            <a style={{ margin: "5px" }}>static</a>
          </Link>
          page.
        </div>
        <div>
          <Link href="/login">
            <a>ユーザー登録/ログイン</a>
          </Link>
        </div>
      </main>
    </div>
  );
};

export async function getStaticProps(): Promise<{
  props: { initialApolloState: NormalizedCacheObject };
}> {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: ViewerQuery,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}

export default Index;
