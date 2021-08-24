const mongoose = require("mongoose");
require("dotenv").config();
const {ApolloServer} = require("apollo-server");
const typeDefs = require("./src/graphql/typeDefs");
const resolvers = require("./src/graphql/resolvers/index");
const PORT = process.env.PORT || 4000;
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
      .listen({port: PORT})
      .then((res) => {
        console.log(`Sever running on ${res.url}`);
      })
      .catch((err) => console.log(err));
  });
