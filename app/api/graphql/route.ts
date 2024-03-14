import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import resolvers from "@/utils/api/grqphql/resolvers";
// import typeDefs from "@/utils/server/grqphql/typeDefs ";

const typeDefs = loadSchemaSync("./utils/api/grqphql/schema.graphql", {
  loaders: [new GraphQLFileLoader()],
});


const server = new ApolloServer({
  resolvers: resolvers,
  typeDefs: typeDefs,
});





const handler = startServerAndCreateNextHandler(server);

export { handler as GET, handler as POST };
