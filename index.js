const mongoose = require("mongoose");
require("dotenv").config();
const {ApolloServer} = require("apollo-server");
const typeDefs = require("./src/graphql/typeDefs");
const resolvers = require("./src/graphql/resolvers/index");
const port = process.env.PORT || 4000;
const Db = process.env.DB;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({req}) => ({req}),
});
mongoose
  .connect(Db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Mongodb Connected");
    return server
      .listen({port})
      .then((res) => {
        console.log(`Sever running on ${res.url}`);
      })
      .catch((err) => console.log(err));
  });
