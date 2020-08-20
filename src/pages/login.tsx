import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import Head from "next/head";
import React, { useState } from "react";

const CreateQuery = gql`
  mutation create($name: String!, $email: String!) {
    create(name: $name, email: $email) {
      success
    }
  }
`;

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [create] = useMutation(CreateQuery);

  const onSubmit = async () => {
    const result = await create({ variables: { name, email } });
    console.log("created", result.data.create.success);
  };

  return (
    <div>
      <Head>
        <title>Create User</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div>
          <label htmlFor="name">名前:</label>
          <input
            id="name"
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">メールアドレス</label>
          <input
            id="email"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button onClick={onSubmit}>登録</button>
      </main>
    </div>
  );
};

export default Login;
