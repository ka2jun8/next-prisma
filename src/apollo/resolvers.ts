export const resolvers = {
  Query: {
    viewer: async (parent, args, context) => {
      const user = await context.dataSources.users.get();
      if (user) {
        return { id: user.id, name: user.name, status: "cached" };
      }
      return { id: -1, name: "undefined", status: "undefined" };
    },
  },
  Mutation: {
    create: async (_, { name, email }, { dataSources }) => {
      console.log("Mutation", { dataSources });
      const results = await dataSources.users.create({ name, email });

      return {
        success: results && results.length > 0,
      };
    },
  },
};
