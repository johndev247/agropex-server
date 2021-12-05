const mongoose = require("mongoose");
require("dotenv").config();
const express = require("express");
const cors = require('cors')
const {ApolloServer} = require("apollo-server-express");
const typeDefs = require("./src/graphql/typeDefs");
const resolvers = require("./src/graphql/resolvers/index");
const PORT = process.env.PORT || 4000;
const Db = process.env.DB;

mongoose
  .connect(Db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Mongodb Connected");
    async function startServer() {
      const app = express();
      const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        introspection: true,
  playground: true,
        context: ({req}) => ({req}),
      });
      await apolloServer.start();
      apolloServer.applyMiddleware({app});
      app.use("/express", (req, res) => res.send("from express"));
      app.use(cors({
      origin: "https://agropex.herokuapp.com"
      }))
      app.listen({port: PORT}, () => {
        console.log(
          `Server running on http://localhost:${PORT}${apolloServer.graphqlPath}`
        );
      });
    };
    startServer();
  });
