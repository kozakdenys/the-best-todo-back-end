const { GraphQLServer } = require("graphql-yoga");
const { prisma } = require("./generated/prisma-client");
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const Subscription = require("./resolvers/Subscription");
const User = require("./resolvers/User");
const Item = require("./resolvers/Item");

const server = new GraphQLServer({
    typeDefs: "./src/schema.graphql",
    resolvers: {
        Query,
        Mutation,
        Subscription,
        User,
        Item,
    },
    context: request => {
        return {
            ...request,
            prisma,
        }
    },
});

server.start(() => console.log("My server is running on http://localhost:4000"));
