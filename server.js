const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const port = process.env.PORT || 9000;
const app = express();
const fs = require("fs");
const typeDefs = fs.readFileSync("./schema.graphql", { encoding: "utf8" });
const resolvers = require("./resolvers");
const { makeExecutableSchema } = require("graphql-tools");
const schema = makeExecutableSchema({ typeDefs, resolvers });
const { ApolloServer } = require("apollo-server-express");
const expressjwt = require("express-jwt");
const jwt = require("jsonwebtoken");
const db = require("./db");

const jwtSecret = Buffer.from("Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt", "base64");

const bootstrap = async () => {
  try {
    app.use(cors({}), bodyParser.json());
    app.use(
      expressjwt({
        secret: jwtSecret,
        credentialsRequired: false,
        algorithms: ["sha1", "RS256", "HS256"],
      })
    );

    app.post("/login", (req, res) => {
      const { email, password } = req.body;
      const user = db.students.list().find((user) => user.email === email);

      if (!user) {
        res.status(404).send("User not found");
        return;
      }
      if (user.password !== password) {
        res.status(401).send("Unauthorize");
        return;
      }

      const token = jwt.sign({ sub: user.id }, jwtSecret);

      res.send({ token });
    });

    const server = new ApolloServer({
      schema,
      debug: true,
      typeDefs,
      resolvers,
      context: ({ req }) => ({
        user: req.user && db.students.get(req.user.sub),
      }),
    });
    await server.start();
    server.applyMiddleware({ app, path: "/graphql" });

    app.listen({ port }, () => {
      console.log(
        `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
      );
    });
  } catch (error) {
    console.error(error);
  }
};

bootstrap();
