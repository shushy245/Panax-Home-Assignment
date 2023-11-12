// While running the server, uncomment the lines below to create my table in your local postgres server

// import File from "./models/file.model";
// File.sync();

import startServer from "./config/express";
import { connectToDatabase } from "./config/sequelize";

connectToDatabase()
  .then(startServer)
  .catch((e) => {
    console.error("Failed to connect", e);
  });
