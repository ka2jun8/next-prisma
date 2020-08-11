import { ApolloServer } from "apollo-server-micro";

import { dataSources } from "../../apollo/data-sources";
import { schema } from "../../apollo/schema";

const apolloServer = new ApolloServer({
  schema,
  dataSources,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: "/api/graphql" });
